"""포트폴리오 로컬 서버.

정적 파일 서빙 + 관리 페이지(admin.html)의 저장 요청(/api/save)을 받아
data.js 를 다시 씁니다. 저장 전 기존 파일은 data.backup.js 로 백업됩니다.

실행:  python serve.py  →  http://localhost:8123
"""

import base64
import http.server
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = 8123


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(length).decode("utf-8"))
            if self.path == "/api/save":
                content = body["content"]
                if "const PROJECTS" not in content:
                    raise ValueError("data.js 형식이 아닙니다")
                data_path = ROOT / "data.js"
                if data_path.exists():
                    shutil.copy2(data_path, ROOT / "data.backup.js")
                data_path.write_text(content, encoding="utf-8", newline="\n")
                self._json(200, {"ok": True})
            elif self.path == "/api/upload":
                name = re.sub(r"[^A-Za-z0-9._-]", "_", body["name"])[-100:] or "img"
                img_dir = ROOT / "img"
                img_dir.mkdir(exist_ok=True)
                (img_dir / name).write_bytes(base64.b64decode(body["data"]))
                self._json(200, {"ok": True, "path": "img/" + name})
            else:
                self.send_error(404)
        except Exception as e:  # noqa: BLE001 - 클라이언트에 에러를 그대로 전달
            self._json(500, {"ok": False, "error": str(e)})

    def end_headers(self):
        # 관리 페이지 저장 직후 새로고침 시 캐시된 옛 파일이 보이지 않도록
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, status, payload):
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode("utf-8"))

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    print(f"Serving portfolio at http://localhost:{PORT} (admin: /admin.html)", flush=True)
    http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()

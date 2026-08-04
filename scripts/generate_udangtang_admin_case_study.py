from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "img" / "udangtang-tower-admin-case-study.pdf"
W, H = A4
LEFT, RIGHT, TOP, BOTTOM = 18 * mm, 18 * mm, 18 * mm, 16 * mm
CW = W - LEFT - RIGHT

NAVY = colors.HexColor("#211B3D")
INK = colors.HexColor("#30294A")
MUTED = colors.HexColor("#746D89")
PINK = colors.HexColor("#FF668E")
MINT = colors.HexColor("#77D8C3")
SKY = colors.HexColor("#A6E0F8")
YELLOW = colors.HexColor("#FFD866")
LILAC = colors.HexColor("#C9B1F7")
PAPER = colors.HexColor("#FFFEFA")
SOFT = colors.HexColor("#F4F0FF")
LINE = colors.HexColor("#DCD5EA")

pdfmetrics.registerFont(TTFont("BodyKR", r"C:\Windows\Fonts\malgun.ttf"))
pdfmetrics.registerFont(TTFont("BoldKR", r"C:\Windows\Fonts\malgunbd.ttf"))

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="TitleKR", fontName="BoldKR", fontSize=29, leading=38, textColor=NAVY, spaceAfter=10))
styles.add(ParagraphStyle(name="Section", fontName="BoldKR", fontSize=21, leading=29, textColor=NAVY, spaceAfter=6))
styles.add(ParagraphStyle(name="Lead", fontName="BodyKR", fontSize=10.5, leading=17, textColor=MUTED, spaceAfter=12, wordWrap="CJK"))
styles.add(ParagraphStyle(name="Body", fontName="BodyKR", fontSize=9.5, leading=15.4, textColor=INK, spaceAfter=6, wordWrap="CJK"))
styles.add(ParagraphStyle(name="Small", fontName="BodyKR", fontSize=8.3, leading=12.3, textColor=INK, wordWrap="CJK"))
styles.add(ParagraphStyle(name="Card", fontName="BoldKR", fontSize=10.5, leading=14.6, textColor=NAVY, wordWrap="CJK"))
styles.add(ParagraphStyle(name="Tag", fontName="BoldKR", fontSize=8, leading=11, textColor=PINK, spaceAfter=4))
styles.add(ParagraphStyle(name="Center", fontName="BoldKR", fontSize=14, leading=20, textColor=NAVY, alignment=TA_CENTER))


def p(text, style="Body"):
    return Paragraph(text, styles[style])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(1.2)
    canvas.line(LEFT, 10 * mm, W - RIGHT, 10 * mm)
    canvas.setFont("BodyKR", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, 6 * mm, "UDANGTANG TOWER · LOCAL ADMIN CASE STUDY")
    canvas.drawRightString(W - RIGHT, 6 * mm, f"{doc.page}")
    canvas.restoreState()


def section(kicker, english, title, lead):
    return [p(f"{kicker}  {english}", "Tag"), p(title, "Section"), p(lead, "Lead")]


def card(title, body, bg):
    t = Table([[p(title, "Card")], [p(body, "Small")]], colWidths=[(CW - 8 * mm) / 3])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.9, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


def twin(title, body, bg):
    t = Table([[p(title, "Card")], [p(body, "Small")]], colWidths=[(CW - 5 * mm) / 2])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), 0.9, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=LEFT, rightMargin=RIGHT, topMargin=TOP, bottomMargin=BOTTOM)
frame = Frame(LEFT, BOTTOM, CW, H - TOP - BOTTOM, id="body")
doc.addPageTemplates([PageTemplate(id="case", frames=[frame], onPage=footer)])
story = []

# 1. Cover
story += [Spacer(1, 16 * mm), p("LOCAL ADMIN · CASE STUDY", "Tag"), p("우당탕 타워\n로컬 어드민", "TitleKR")]
story += [p("게임을 만드는 단계에서, 밸런스와 릴리스를 스스로 안전하게 운영하는 단계로 확장한 작업", "Lead")]
hero = Table([[p("<b>왜 필요했나</b><br/>플레이 테스트를 반복할수록 문어 블록 확률, 젠가 마찰, 낙하 허용 범위, 보상처럼 코드 밖에서 빠르게 조절해야 할 수치가 늘어났다.", "Small"),
               p("<b>무엇을 만들었나</b><br/>외부 밸런스 스냅샷, 로컬 전용 운영 화면, 테스트 배포를 통과해야만 열리는 프로덕션 배포 흐름을 만들었다.", "Small"),
               p("<b>무엇을 막았나</b><br/>검수되지 않은 코드의 배포, 임의의 프로덕션 수치 변경, 외부에서 열린 운영 권한을 구조적으로 차단했다.", "Small")]], colWidths=[CW / 3] * 3)
hero.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#FFF4D1")),
    ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#EAF9F5")),
    ("BACKGROUND", (2, 0), (2, 0), colors.HexColor("#F2EDFF")),
    ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 11),
    ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 14),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story += [Spacer(1, 12 * mm), hero, Spacer(1, 18 * mm)]
story += [p("운영 도구는 공개 서비스가 아니라, 개발자가 자신의 PC에서만 열어 쓰는 도구로 설계했다. 포트폴리오의 웹 화면은 동작을 설명하는 샘플이며 실제 배포나 데이터 변경 권한은 없다.", "Body")]
story += [Spacer(1, 7 * mm), p("핵심 키워드", "Card"), p("로컬 전용 · Cloudflare D1 · 버전 불변성 · 체크섬 · 감사 로그 · Staging → Production Gate · AI-assisted Verification", "Body"), PageBreak()]

# 2. Need and design
story += section("01", "CONTEXT", "대화 속 플레이 피드백을\n운영 가능한 규칙으로 바꾸다", "우당탕 타워는 ‘재미있지만 억울하지 않은 물리’를 계속 다듬는 게임이다. 피드백이 누적될수록 수치 하나를 고치는 일도 단순한 상수 변경이 아니라, 플레이 흐름과 배포 절차를 함께 확인해야 하는 운영 작업이 되었다.")
story += [Table([[card("문제가 된 반복", "문어 블록 출현 빈도, 젠가의 마찰, 블록 이동 단위, 낙하 판정, 별조각 보상 곡선처럼 플레이 경험을 좌우하는 값이 계속 조정 대상이 되었다.", colors.HexColor("#FFF8E5")),
                  card("설계 판단", "수치를 코드에 묶어 두면 작은 밸런스 수정도 빌드·배포를 동반한다. 반대로 외부 데이터를 무제한으로 열면 검수와 재현성이 사라진다.", colors.HexColor("#EEF9F7")),
                  card("선택한 해법", "D1에 불변 버전으로 저장하고, 로컬 도구에서 스테이징에 먼저 반영한다. 프로덕션은 검수된 스냅샷만 승격할 수 있게 했다.", colors.HexColor("#F3EEFF"))]], colWidths=[CW / 3] * 3), Spacer(1, 14)]
story += [p("게임 실행 중인 한 판은 시작 당시의 밸런스 체크섬을 유지한다. 새 밸런스는 로비 또는 새 게임 시작 시점에만 읽어 들인다. 이 규칙 덕분에 운영 중 수치가 바뀌어도 플레이 중인 물리와 보상 계산이 갑자기 달라지지 않는다.", "Body")]
story += [Spacer(1, 8), p("운영 데이터로 분리한 대표 항목", "Card")]
rows = [[p("영역", "Card"), p("운영 데이터로 둔 값", "Card"), p("플레이 품질에 주는 효과", "Card")],
        [p("물리", "Small"), p("마찰, 반발, 낙하 판정 여유, 이동 단위", "Small"), p("억울한 실패를 줄이고 조작 감각을 빠르게 조정", "Small")],
        [p("콘텐츠", "Small"), p("특수 블록 확률, 젠가 등장 조건, 블록 가중치", "Small"), p("희귀함과 난이도를 코드 수정 없이 튜닝", "Small")],
        [p("보상", "Small"), p("별조각 발생/수량 확률, 높이 구간", "Small"), p("보상 경제를 검증된 곡선으로 유지", "Small")]]
t = Table(rows, colWidths=[25 * mm, 73 * mm, CW - 98 * mm])
t.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), ("BACKGROUND", (0, 1), (-1, -1), PAPER), ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8)]))
story += [t, PageBreak()]

# 3. Flow
story += section("02", "RELEASE FLOW", "스테이징 검수 없이는\n프로덕션 배포도 없다", "‘테스트 배포를 한 적 있다’는 말만으로는 부족하다. 현재 Git 상태와 원격 스테이징에 올라간 버전이 정확히 같은지를 자동으로 확인해, 검증하지 않은 상태가 프로덕션으로 가는 길을 잠근다.")
flow = [[p("1", "Center"), p("2", "Center"), p("3", "Center"), p("4", "Center")],
        [p("코드·밸런스 변경", "Small"), p("스테이징 배포", "Small"), p("플레이 검수", "Small"), p("프로덕션 승격", "Small")],
        [p("작은 변경도 테스트 가능한 단위로 정리", "Small"), p("빌드·규칙 테스트·D1 마이그레이션·워커 배포", "Small"), p("실제 조작과 화면 흐름을 확인", "Small"), p("동일 SHA·동일 원격 버전일 때만 허용", "Small")]]
f = Table(flow, colWidths=[CW / 4] * 4)
f.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), YELLOW), ("BACKGROUND", (0, 1), (-1, -1), PAPER), ("BOX", (0, 0), (-1, -1), 1, NAVY), ("INNERGRID", (0, 0), (-1, -1), 0.55, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8)]))
story += [f, Spacer(1, 15), p("밸런스 반영 흐름", "Card"), p("로컬 화면에서 새 스냅샷 생성 → 스테이징 D1에 버전/체크섬/감사 로그와 함께 기록 → QA 플레이 확인 → 같은 체크섬만 프로덕션에 승격. 스테이징에서 수정하지 않은 값은 프로덕션에서 직접 바꿀 수 없다.", "Body"), Spacer(1, 10)]
story += [Table([[twin("실제 운영 화면", "배포 상태, 현재 Git SHA, 스테이징 수신증, 밸런스 체크섬을 한 화면에서 확인한다. 실행 버튼은 조건이 맞지 않으면 잠긴다.", colors.HexColor("#EDF8FF")), twin("샘플 공개 화면", "포트폴리오에는 정보 구조와 UX만 재현한다. 실제 토큰·데이터·배포 권한은 포함하지 않아 외부 방문자가 실행할 수 없다.", colors.HexColor("#F6F0FF"))]], colWidths=[(CW - 5 * mm) / 2, (CW - 5 * mm) / 2]), PageBreak()]

# 4. Safety and AI collaboration
story += section("03", "SAFETY", "실수와 우회를 전제로\n만든 안전장치", "운영 도구는 편해야 하지만 동시에 배포와 데이터 변경 권한을 가진다. 그래서 실제 운영 화면은 인터넷에 공개하지 않고, 실행 위치와 변경 경로부터 제한했다.")
safe_rows = [[p("경계", "Card"), p("적용 방식", "Card"), p("의도", "Card")],
             [p("접근", "Small"), p("127.0.0.1 바인딩, 시작 때 생성되는 일회성 토큰, HttpOnly 쿠키", "Small"), p("다른 기기에서 운영 화면을 열지 못하게 차단", "Small")],
             [p("요청", "Small"), p("Host·Origin 검사, CORS 미허용, 인증 없는 API는 401", "Small"), p("외부 페이지와 비인증 브라우저의 변경 요청 차단", "Small")],
             [p("코드 배포", "Small"), p("깨끗한 Git 작업 트리, 동일 SHA 스테이징 통과, 원격 버전 일치", "Small"), p("검수한 코드와 다른 코드가 배포되는 상황 방지", "Small")],
             [p("밸런스", "Small"), p("불변 버전, SHA-256 체크섬, 감사 로그, 스테이징에서만 편집", "Small"), p("수치의 출처와 적용 이력을 보존", "Small")]]
s = Table(safe_rows, colWidths=[28 * mm, 76 * mm, CW - 104 * mm])
s.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), NAVY), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), ("BACKGROUND", (0, 1), (-1, -1), PAPER), ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("TOPPADDING", (0, 0), (-1, -1), 8), ("BOTTOMPADDING", (0, 0), (-1, -1), 8), ("LEFTPADDING", (0, 0), (-1, -1), 8), ("RIGHTPADDING", (0, 0), (-1, -1), 8)]))
story += [s, Spacer(1, 15), p("AI 협업 방식", "Card"), p("게임 규칙, 재미의 기준, 허용할 물리 오차, 운영·배포 정책은 개발 방향에서 먼저 결정한다. AI는 그 결정을 테스트 가능한 규칙, D1 스키마, 배포 스크립트, 로컬 UI, 문서 초안으로 빠르게 구체화한다. 실제로 Windows 환경의 배포 실행 이슈는 원인을 추적해 npm 실행 경로를 수정하고, 같은 문제가 재발하지 않도록 회귀 테스트에 포함했다.", "Body"), p("결과적으로 AI는 판단을 대신하는 버튼이 아니라, 반복 속도와 검증 범위를 넓히는 개발 도구로 사용되었다. 현재 게임·운영 규칙 62개가 자동 테스트로 묶여 있으며, 앞으로 결제·멀티플레이가 추가되어도 같은 배포 게이트와 데이터 이력을 확장할 수 있다.", "Body")]

doc.build(story)
print(OUT)

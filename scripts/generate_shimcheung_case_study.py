from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, Frame, Image, PageBreak,
                                PageTemplate, Paragraph, Spacer, Table, TableStyle)
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "img"
OUT = IMG / "shimcheung-quarterview-arena.pdf"
W, H = A4
LEFT, RIGHT, TOP, BOTTOM = 18 * mm, 18 * mm, 18 * mm, 16 * mm
CW = W - LEFT - RIGHT

NAVY = colors.HexColor("#211B3D")
INK = colors.HexColor("#30294A")
MUTED = colors.HexColor("#746D89")
PINK = colors.HexColor("#FF668E")
YELLOW = colors.HexColor("#FFD866")
PAPER = colors.HexColor("#FFFEFA")
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
styles.add(ParagraphStyle(name="Cap", fontName="BodyKR", fontSize=8, leading=11.5, textColor=MUTED, alignment=TA_CENTER, wordWrap="CJK"))
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
    canvas.drawString(LEFT, 6 * mm, "SHIMCHEUNG · QUARTER-VIEW AUTO ARENA")
    canvas.drawRightString(W - RIGHT, 6 * mm, f"{doc.page}")
    canvas.restoreState()


def section(kicker, english, title, lead):
    return [p(f"{kicker}  {english}", "Tag"), p(title, "Section"), p(lead, "Lead")]


def card(title, body, bg, cols=3):
    t = Table([[p(title, "Card")], [p(body, "Small")]], colWidths=[(CW - 8 * mm) / cols])
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


def shot(name, caption, height_mm):
    """A screenshot scaled to a fixed height, with its caption underneath."""
    path = IMG / name
    iw, ih = ImageReader(str(path)).getSize()
    h = height_mm * mm
    w = h * iw / ih
    return [Image(str(path), width=w, height=h, hAlign="CENTER"), Spacer(1, 4), p(caption, "Cap")]


def grid(rows, widths):
    t = Table(rows, colWidths=widths)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("BACKGROUND", (0, 1), (-1, -1), PAPER),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
    ]))
    return t


doc = BaseDocTemplate(str(OUT), pagesize=A4, leftMargin=LEFT, rightMargin=RIGHT, topMargin=TOP, bottomMargin=BOTTOM)
frame = Frame(LEFT, BOTTOM, CW, H - TOP - BOTTOM, id="body")
doc.addPageTemplates([PageTemplate(id="case", frames=[frame], onPage=footer)])
story = []

# ---------------------------------------------------------------- 1. Cover
story += [Spacer(1, 16 * mm), p("QUARTER-VIEW AUTO ARENA · CASE STUDY", "Tag")]
story += [p("심층 深層\n쿼터뷰 오토 아레나", "TitleKR")]
story += [p("아이템을 넣기 전에, 아이템이 붙을 자리를 먼저 만든 작업", "Lead")]

hero = Table([[p("<b>무엇이 문제였나</b><br/>위치가 없는 큐 전투에서는 아이템이 바꿀 수 있는 축이 DPS 숫자 하나뿐이다. 슬롯 6칸을 만들어도 체감은 ‘죽는 속도’ 한 가지로 수렴한다.", "Small"),
               p("<b>무엇을 했나</b><br/>전투를 평면으로 옮겨 아키타입 6종과 부채꼴 판정을 넣고, 다음 버전의 아이템이 꽂힐 확장점 3개를 미리 뚫었다.", "Small"),
               p("<b>무엇을 지켰나</b><br/>이미 검증된 경제 뼈대를 건드리지 않았다. 층 총 HP·총 골드가 이전 버전과 <b>오차 0.0000%</b>다.", "Small")]],
             colWidths=[CW / 3] * 3)
hero.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (0, 0), colors.HexColor("#FFF4D1")),
    ("BACKGROUND", (1, 0), (1, 0), colors.HexColor("#EAF9F5")),
    ("BACKGROUND", (2, 0), (2, 0), colors.HexColor("#F2EDFF")),
    ("BOX", (0, 0), (-1, -1), 0.8, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.6, LINE),
    ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 11),
    ("RIGHTPADDING", (0, 0), (-1, -1), 11), ("TOPPADDING", (0, 0), (-1, -1), 14),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
]))
story += [Spacer(1, 12 * mm), hero, Spacer(1, 14 * mm)]
story += [p("Unity 6 · URP 2D · 세로 모바일. 스프라이트와 효과음, 배경음까지 전부 런타임에 생성한다 — 프로젝트에 <b>.png / .wav 에셋이 하나도 없다.</b>", "Body")]
story += [Spacer(1, 6 * mm), p("핵심 키워드", "Card"),
          p("쿼터뷰 · 오토 배틀 · 몬스터 아키타입 · 엘리트 접두사 · 스탯 파이프라인 · 이벤트 버스 · 절차적 생성 · 경제 불변성 검증", "Body"),
          PageBreak()]

# ---------------------------------------------------------------- 2. Diagnosis
story += section("01", "DIAGNOSIS", "‘원웨이’의 정체는\n밸런스가 아니라 차원이었다",
                 "다음 버전에 디아블로2식 아이템을 넣기로 했는데, 아이템을 설계하기 전에 전투부터 진단했다. 결론은 수치 문제가 아니었다. 바꿀 수 있는 축이 애초에 하나뿐이었다.")
story += [p("이전 버전의 전투는 이랬다. 적은 위치가 없는 리스트였고, 공격은 언제나 맨 앞을 때렸고, 넘친 피해가 리스트 순서대로 뒤로 흘렀다. 여기서 아이템이 개입할 수 있는 지점은 <b>피해량 숫자 하나</b>뿐이다.", "Body")]
story += [Spacer(1, 6)]
story += [grid([[p("축", "Card"), p("한 줄 큐 전투", "Card"), p("공간 아레나", "Card")],
                [p("누구를 때릴까", "Small"), p("맨 앞 — 선택 불가", "Small"), p("교체 가능한 타겟팅 정책", "Small")],
                [p("어디를 때릴까", "Small"), p("개념이 없다", "Small"), p("부채꼴 범위 · 위치", "Small")],
                [p("어디에 설까", "Small"), p("개념이 없다", "Small"), p("거리 유지 · 파고들기 · 회피", "Small")],
                [p("몹이 뭘 하나", "Small"), p("걸어와서 맞는다", "Small"), p("아키타입별 고유 행동", "Small")]],
               [34 * mm, 58 * mm, CW - 92 * mm])]
story += [Spacer(1, 12)]
story += [p("네 축 중 셋은 사이드뷰를 유지한 채로는 <b>존재할 수 없다.</b> 아이템만 다양화하는 길은 없었고, 그래서 아이템보다 전투를 먼저 갈아엎었다.", "Body")]
story += [Spacer(1, 8)]
story += [p("이 순서를 택한 두 번째 이유는 검증 비용이다. 아이템과 아레나를 동시에 만들면 재미가 없을 때 <b>무엇이 문제인지 분리할 수 없다.</b> 아이템 없이 전투만으로 다양해지는지 먼저 확인하면, 실패해도 훨씬 싸게 안다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 3. Arena
story += section("02", "THE ARENA", "45도로 돌리지 않고\nY축만 눌렀다",
                 "쿼터뷰지만 좌표계는 회전하지 않는다. 논리 평면은 그대로 두고 그릴 때만 세로를 절반으로 압축한다. 아이소메트릭 ‘룩’은 지면 타일과 스프라이트가 만든다.")
story += [Table([[card("왜 회전하지 않았나", "45도로 돌리면 사각 맵이 마름모가 되어 세로 화면을 낭비한다. 압축만 하면 맵이 화면을 꽉 채운다.", colors.HexColor("#FFF8E5")),
                  card("무엇을 아꼈나", "거리·각도·분리 계산이 전부 평범한 유클리드로 남는다. 전투 코드에 투영 보정이 한 줄도 없다.", colors.HexColor("#EEF9F7")),
                  card("정렬", "sortingOrder = -screenY. 앞의 것이 뒤를 가린다. 이 한 줄이 깊이감 전부다.", colors.HexColor("#F3EEFF"))]],
                colWidths=[CW / 3] * 3), Spacer(1, 14)]
story += shot("shimcheung-arena.png", "지하 23층. 아키타입 6종과 엘리트 팩이 섞여 있고, 주인공은 발밑 금색 링으로 식별한다.", 92)
story += [PageBreak()]

# ---------------------------------------------------------------- 4. Mobs
story += section("03", "ARCHETYPES", "스탯만 다른 몹은\n다양화가 아니다",
                 "여섯 종류를 만들 때 기준은 단 하나였다 — 서로 <b>다른 대응</b>을 요구하는가. 체력과 속도만 다르면 여섯 개의 같은 몹일 뿐이다.")
story += [grid([[p("아키타입", "Card"), p("행동", "Card"), p("이게 요구하는 것", "Card")],
                [p("돌격병", "Small"), p("최단거리로 붙어 근접 공격", "Small"), p("물량 — 부채꼴로 쓸어담는 대상", "Small")],
                [p("사수", "Small"), p("거리 유지, 접근하면 후퇴", "Small"), p("<b>거리</b> — 붙거나 던져야 죽는다", "Small")],
                [p("방벽술사", "Small"), p("주변 아군에 피해 감소 오라", "Small"), p("<b>우선순위</b> — 얘부터 안 죽이면 딜이 안 박힌다", "Small")],
                [p("자폭체", "Small"), p("붙어서 폭발", "Small"), p("<b>분산</b> — 몰려 있을 때 위험", "Small")],
                [p("분열체", "Small"), p("죽으면 둘로 갈라진다", "Small"), p("<b>광역</b> — 단일 타겟으로는 늘어난다", "Small")],
                [p("소환사", "Small"), p("주기적으로 병력 생성", "Small"), p("<b>차단</b> — 방치하면 무한 증식", "Small")]],
               [26 * mm, 58 * mm, CW - 84 * mm])]
story += [Spacer(1, 12)]
story += [p("방벽술사와 소환사가 이 설계의 시험대다. 둘 다 ‘가장 가까운 적’만 때리는 기본 AI로는 제대로 대응할 수 없고, 그래서 다음 버전의 <b>타겟팅 아이템에 존재 이유</b>를 준다. 이 둘이 성가시게 느껴지지 않으면 타겟팅 아이템도 의미가 없다는 뜻이므로, 그 사실을 아이템을 만들기 전에 알 수 있다.", "Body")]
story += [Spacer(1, 10)]
story += [p("여기에 엘리트 접두사 6종(화염·냉기·번개·마법저항·광전사·재생)을 <b>직교</b>로 얹는다. ‘광전사 분열체’ 같은 조합이 나오고, 6 × 6 = 36가지가 층마다 결정론적으로 섞인다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 5. Economy
story += section("04", "INVARIANCE", "밀도를 2.4배로 올리면서\n밸런스는 한 톨도 건드리지 않았다",
                 "디아블로2 같은 밀도를 원했지만, 한 층의 마릿수를 10에서 24로 늘리면 이미 검증해 둔 성장 곡선과 ‘벽’ 위치가 통째로 무효가 된다. 그래서 개체 수치를 나눠 <b>층 총합</b>을 보존했다.")
story += [Table([[card("무엇을 바꿨나", "한 층의 마릿수 10 → 24. 화면에 실제로 몰려드는 몸이 늘어난다.", colors.HexColor("#FFF8E5"), 2),
                  card("무엇을 고정했나", "층 총 HP = 기준값 × 12.7, 층 총 골드, 보스 HP. 개체당 값을 나누고 0.87~1.13 램프를 얹어 평균을 정확히 1로 맞췄다.", colors.HexColor("#EEF9F7"), 2)]],
                colWidths=[(CW - 5 * mm) / 2] * 2), Spacer(1, 14)]
story += [p("검증", "Card"), Spacer(1, 4)]
story += [grid([[p("검증 항목", "Card"), p("방법", "Card"), p("결과", "Card")],
                [p("층 총 HP", "Small"), p("1~80층 전수 비교", "Small"), p("<b>오차 0.0000%</b>", "Small")],
                [p("층 총 골드", "Small"), p("1~80층 전수 비교", "Small"), p("<b>오차 0.0000%</b>", "Small")],
                [p("보스 HP", "Small"), p("보스층 전수 비교", "Small"), p("<b>오차 0.0000%</b>", "Small")]],
               [40 * mm, 60 * mm, CW - 100 * mm])]
story += [Spacer(1, 12)]
story += [p("전투를 통째로 교체하는 작업에서 가장 비싼 실수는 ‘같이 바꿔버리는 것’이다. 화면은 완전히 달라졌지만 성장 곡선은 이전 버전이 측정한 그 자리에 그대로 있고, 그래서 이전 버전의 밸런스 검증 결과를 버리지 않아도 됐다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 6. Extension points
story += section("05", "EXTENSION POINTS", "다음 버전이 전투 코드를\n다시 짜지 않게 하는 세 구멍",
                 "이번 버전에는 아이템이 없다. 그래서 아래 셋은 소비자가 거의 없는 채로 만들어졌다. 의도된 선반영이고, 이걸 안 하면 다음 버전이 전투 코드를 전부 다시 짜야 한다.")
story += [Table([[card("스탯 파이프라인", "전투 코드가 최종 수치를 직접 계산하지 않는다. 기본값 → 강화 → 특성 → 스킬 → <b>[장비]</b> 순서의 합산 테이블만 읽는다.", colors.HexColor("#FFF8E5")),
                  card("교체 가능한 타겟팅", "타겟 선정이 델리게이트다. 이번엔 ‘최근접’ 하나만 구현했다. 중요한 건 개수가 아니라 <b>갈아끼울 수 있다는 사실</b>이다.", colors.HexColor("#EEF9F7")),
                  card("전투 이벤트 버스", "적중·처치·피격·웨이브가 위치와 피해 타입을 실어 발행된다. 시체 폭발, 연쇄, 피격 시 반격 같은 아이템 트리거가 전부 여기 붙는다.", colors.HexColor("#F3EEFF"))]],
                colWidths=[CW / 3] * 3), Spacer(1, 14)]
story += [p("스킬도 같은 원칙을 따른다. 예를 들어 ‘휠윈드’는 전투 코드에 분기가 하나도 없다 — 스탯 테이블의 <b>부채꼴 각도를 360도로, 사거리와 공격속도를 배수로</b> 바꿀 뿐이다. 아이템이 잡을 손잡이와 스킬이 잡는 손잡이가 같다는 뜻이고, 이것이 확장점이 실제로 작동한다는 가장 실용적인 증거다.", "Body")]
story += [Spacer(1, 10)]
story += [p("합격 기준도 미리 정해 뒀다. <b>다음 버전에서 새 전투 코드를 짜야 한다면 이번 버전이 구멍을 잘못 뚫은 것</b>이고, 그때는 아이템을 진행하지 말고 확장점부터 고친다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 7. Reversal
story += section("06", "COURSE CORRECTION", "완전 무조작을 밀어붙였다가\n스위치를 달아 되돌렸다",
                 "처음 방향은 ‘조작 0’이었다. 이동·타겟팅·공격·스킬 전부 자동. 그런데 그 결정이 이 버전의 가장 유력한 실패 지점이라는 것을 설계 문서에 스스로 적어 뒀었고, 실제로 그랬다.")
story += [p("손이 할 일이 사라진 자리를 전투 다양성이 메워야 하는데, 메웠는지는 만들어 봐야만 안다. 방향을 뒤집지 않으면서 손이 닿을 자리만 되돌려주는 쪽을 택했다. <b>자동화는 기본값이어야지 감옥이면 안 된다.</b>", "Body")]
story += [Spacer(1, 10)]
story += [grid([[p("되돌린 것", "Card"), p("어떻게", "Card"), p("지킨 원칙", "Card")],
                [p("스킬 버튼", "Small"), p("AUTO 스위치. 기본 ON, 끄면 타이밍이 사람 몫", "Small"), p("아무것도 안 해도 굴러간다", "Small")],
                [p("이동 조작", "Small"), p("드래그하면 떠오르는 조이스틱", "Small"), p("자동 타겟팅·공격은 계속 돈다", "Small")],
                [p("사냥터 선택", "Small"), p("클리어한 비보스 층 자유 왕복", "Small"), p("기록은 변하지 않는다", "Small")]],
               [30 * mm, 70 * mm, CW - 100 * mm])]
story += [Spacer(1, 12)]
story += [p("스킬 3종도 함께 갈아치웠다. 이전 셋은 전부 <b>곱셈 버프</b>여서 화면에서 구별되지 않았다. 지금은 ‘폭주(강해진다)·휠윈드(휘두르는 모양이 바뀐다)·검 투척(닿지 않던 곳에 닿는다)’ — 셋이 하는 일이 다르다.", "Body")]
story += [Spacer(1, 8)]
story += [p("이동 조작에는 실패 조건도 명시했다. <b>필수가 되는 순간 방치형이 아니게 된다.</b> 쓰지 않아도 손해가 없고, 써도 이득이 크지 않아야 한다.", "Body")]
story += [Spacer(1, 12)]
story += shot("shimcheung-warp.png", "층 이동 패널. 보스 층은 시간 제한 시험이므로 스테퍼가 건너뛴다 — 자유 재입장은 시도를 공짜로 다시 굴리는 것이 되기 때문이다.", 76)
story += [PageBreak()]

# ---------------------------------------------------------------- 8. Presentation
story += section("07", "PRESENTATION", "고르게 흘러가는 게임일수록\n구두점이 필요하다",
                 "방치형은 의도적으로 평탄하다. 그래서 보스가 죽는 순간이 잡몹이 죽는 순간과 똑같이 보이면, 게임에 사건이 하나도 없게 된다.")
story += [Table([[card("무엇을 했나", "보스 처치 시 1.55초 동안 시체로 줌인하고 시간 배율을 0.22까지 떨어뜨린다. 이 게임의 유일한 컷 연출이다.", colors.HexColor("#FFF8E5"), 2),
                  card("무엇이 함정이었나", "시뮬레이션은 죽는 즉시 유닛을 치운다. 첫 구현은 카메라가 <b>빈 바닥으로</b> 밀고 들어갔다. 시체를 따로 붙잡아 두고, 연출이 끝날 때까지 층 전환도 붙잡는다.", colors.HexColor("#EEF9F7"), 2)]],
                colWidths=[(CW - 5 * mm) / 2] * 2), Spacer(1, 12)]
story += shot("shimcheung-boss-cinematic.png", "보스 처치 연출. 시간 배율이 떨어져 있어도 HUD는 비배율 시간으로 돌린다 — UI가 같이 기어가면 연출이 아니라 렉으로 읽힌다.", 78)
story += [Spacer(1, 10)]
story += [p("작은 결정들도 같은 기준으로 걸렀다. <b>매 타격 연출은 금지</b>다 — 치명타 확률이 80%까지 오르므로 ‘치명타마다 X’는 사실상 ‘항상 X’다. 화면 흔들림은 아레나에만 걸고 UI에는 걸지 않는다. 누르려는 버튼이 흔들리면 안 되기 때문이다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 9. Procedural
story += section("08", "PROCEDURAL ART", "이미지 파일이 하나도 없다",
                 "스프라이트·효과음·배경음을 전부 코드가 만든다. 라이선스 관리 대상이 없고, 다운로드 용량이 거의 없고, 팔레트를 수치 한 곳에서 다시 조율할 수 있다.")
story += shot("shimcheung-icons.png", "능력치·스킬 아이콘 11종. 알파 마스크로 그려서 색은 UI가 입힌다.", 34)
story += [Spacer(1, 12)]
story += [p("이 아이콘들에는 이유가 있다. 원래는 능력치마다 한글 한 글자(검·속·급·처·금·동)를 썼는데, 44px 뱃지 안의 조밀한 한글 여섯 개는 여섯 개의 얼룩으로 읽힌다. <b>플레이어는 아이콘이 아니라 행 위치를 외우고 있었다</b> — 즉 아이콘이 아무 일도 하지 않고 있었다.", "Body")]
story += [Spacer(1, 8)]
story += [p("절차적 생성에는 고유한 함정도 있다. 지면 타일은 다이아몬드 주기가 텍스처 크기를 정확히 나누어야 이음매가 보이지 않고, 합성 배경음은 모든 주파수를 <b>루프 길이 안에서 정수 번 진동하도록</b> 스냅해야 이음매가 들리지 않는다.", "Body")]
story += [PageBreak()]

# ---------------------------------------------------------------- 10. Honest close
story += section("09", "STATUS", "검증한 것과\n아직 검증하지 않은 것",
                 "포트폴리오에 적을 만한 숫자만 적는 것은 쉽다. 실제로 확인한 것과 확인하지 않은 것을 나눠 두는 편이 다음 작업에 훨씬 쓸모 있다.")
story += [Table([[card("확인한 것", "컴파일 0에러 0워닝 · 경제 불변 1~80층 오차 0.0000% · 스킬 수치 실측(부채꼴 96→360도, 피해 ×2.4) · 수동 이동 실측(이론값과 정확히 일치) · 보스 연출 프레임 캡처 · 층 이동과 보스층 스킵", colors.HexColor("#EEF9F7"), 2),
                  card("아직 확인하지 않은 것", "<b>사람이 끝까지 플레이한 적이 없다.</b> 터치 조이스틱 실기 감도, 모바일 실기 성능, 새 스킬 3종의 밸런스. 밸런스는 아이템이 들어오는 다음 버전에서 한 번에 맞춘다", colors.HexColor("#FFF1F4"), 2)]],
                colWidths=[(CW - 5 * mm) / 2] * 2), Spacer(1, 14)]
story += [p("가장 정직하게 적어 둘 위험은 이것이다. 이 버전은 <b>손이 거의 할 일이 없는 전투를 계속 볼 이유가 있는가</b>를 묻는 실험이고, 그 답은 코드로는 알 수 없다. 그래서 다음 버전(아이템 파밍)의 착수 조건을 ‘실제 플레이’로 못 박아 두었다.", "Body")]
story += [Spacer(1, 12)]
story += [p("작업 방식", "Card"), Spacer(1, 4)]
story += [p("설계를 먼저 문서로 확정하고(계약), 구현하면서 계약에서 벗어난 항목을 표로 남긴다. 이번 버전에서는 10건이 기록됐다 — 예를 들어 ‘고정 카메라’는 계약이 명시적으로 반대했던 항목인데, 몹을 플레이어 기준 반경에 스폰해 계약이 걱정하던 문제 자체를 없앤 뒤에 추적 카메라로 바꿨다. <b>합의를 조용히 어기지 않고, 어긴 이유를 남기는 것</b>이 이 방식의 핵심이다.", "Body")]
story += [Spacer(1, 8)]
story += [p("그 기록 덕분에 잡아낸 버그도 있다. 이전 버전에서 ‘가리는 몹 반투명화’를 완료로 기록했는데, 실제로는 함수만 있고 <b>어디서도 호출되지 않는 죽은 코드</b>였다. 인계 문서와 실제 화면을 대조하는 과정에서 드러났다.", "Body")]

doc.build(story)
print(f"wrote {OUT}")

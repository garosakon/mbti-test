/* question-bank.js
 * 題庫資料集中管理：93 題 + 360 題庫
 * - 不用 fetch，file:// 也能跑
 * - Alpine app 直接讀 window.QUESTION_BANK
 */
(function () {
  // --- 93 題 原始資料（完整搬出 HTML） ---
  const raw93Questions = `
1	當我某天想去一個地方時，我通常會：a.去之前先想好該做的事；b.去了再說	a:J,b:P
2	我覺得自己更傾向於是一個：a.隨遇而安的人；b.做事遵循計畫的人	a:P,b:J
3	如果我是一位老師的話，我更喜歡教：a.偏重於事實的課程；b.偏重於理論的課程	a:S, b:N
4	我通常是一個：a.容易和大家打成一片的人；b.說話不是很多的人	a:E, b:I
5	我通常和_____相處較好：a.愛想像的人；b.現實的人	a:N, b:S
6	我覺得自己更是一個：a.重情感的人；b.重理智的人	a:F,b:T
7	我更喜歡：a.按興致做事情；b.按計畫做事情	a:P,b:J
8	我：a.很容易被別人理解；b.很難被別人理解	a:E,b:I
9	按日程表做事：a.正合我意；b.束縛了我	a:J,b:P
10	當有一件具體的工作要做時，我喜歡：a.事先就規劃好，寫下時間表；b.邊做邊調整	a:J,b:P
11	在多數情況下，我更喜歡：a.想到哪做到哪；b.按日程表執行	a:P,b:J
12	大多數人說我是一個：a.不太把事情告訴別人的人；b.暢所欲言的人	a:I,b:E
13	我更願意被別人看成是：a.一個注重實際的人；b.一個足智多謀的人	a:S,b:N
14	在一群人中，我通常：a.容易主動去結識新朋友；b.更多時候等著別人來認識我	a:E,b:I
15	我更願意和____交朋友：a.總能有創新想法的人；b.腳踏實地的人	a:N,b:S
16	決策時，我更傾向於：a.考慮人的因素；b.考慮事情本身	a:F,b:T
17	我做事情更喜歡：a.先看一看有什麼新情況後再作打算；b.盡早就把事情定下來	a:P,b:J
18	更多的時候，我喜歡：a.自己一個人待著；b.和他人在一起	a:I,b:E
19	身邊有很多人：a.會令我變得更有精神；b.會令我感到疲於應付	a:E,b:I
20	我更喜歡：a.早一點就把聚會或活動的時間定下來；b.到時候再定	a:J,b:P
21	在旅行時，我更喜歡：a.根據情況安排活動；b.事先就想清楚一整天的活動	a:P,b:J
22	在聚會活動中，我往往：a.會感到厭煩、疲倦；b.能過得高興、盡興	a:I,b:E
23	我更喜歡：a.和他人交往；b.和自己的內心交流	a:E,b:I
24	我更喜歡和____的人打交道：a.想法新奇、思維敏捷的人；b.講話有根有據、遵循常理的人	a:N,b:S
25	在日常工作中，我更喜歡：a.在時間緊迫的情況下，爭分奪秒地工作；b.早作計畫並盡早完成，以免在壓力下工作	a:J,b:P
26	我覺得別人通常：a.要花較長的時間才能和我熟悉起來；b.很快就能和我熟悉起來	a:I,b:E
27	你更喜歡：a.實際的；b.理論的	a:S,b:N
28	你更喜歡：a.少許朋友；b.許多朋友	a:I,b:E
29	你更喜歡：a.井井有條；b.即興隨意	a:J,b:P
30	你更喜歡：a.想像出來的；b.現實存在的	a:N,b:S
31	你更喜歡：a.溫暖的；b.客觀的	a:F,b:T
32	你更喜歡：a.公正的；b.熱情的	a:F,b:T
33	你更喜歡：a.建造；b.發明	a:T,b:F
34	你更喜歡：a.安靜的；b.好交際的	a:I,b:E
35	你更喜歡：a.理論；b.事實	a:T,b:F
36	你更喜歡：a.同情憐憫；b.邏輯法則	a:F,b:T
37	你更喜歡：a.分析；b.感受	a:T,b:F
38	你更喜歡：a.理智多思；b.細膩善感	a:T,b:F
39	你更喜歡：a.想像；b.實際	a:N,b:S
40	你更喜歡：a.慷慨的；b.堅定的	a:F,b:T
41	你更喜歡：a.一視同仁；b.體恤照顧	a:F,b:T
42	你更喜歡：a.生產；b.創作	a:J,b:P
43	你更喜歡：a.可能的；b.必然的	a:J,b:P
44	你更喜歡：a.關心溫暖；b.堅強有力	a:F,b:T
45	你更喜歡：a.實用價值；b.情感需要	a:T,b:F
46	你更喜歡：a.製作；b.設計	a:T,b:F
47	你更喜歡：a.新奇的；b.已知的	a:N,b:S
48	你更喜歡：a.同情；b.分析	a:F,b:T
49	你更喜歡：a.堅定的；b.心腸軟的	a:T,b:F
50	你更喜歡：a.直觀；b.抽象	a:N,b:S
51	你更喜歡：a.忠誠；b.堅定	a:F,b:T
52	你更喜歡：a.競爭性；b.好心腸	a:F,b:T
53	你更喜歡：a.實用性；b.創新性	a:T,b:F
54	當我有一項重要工作需要在一個星期內完成時，我會：a.事先寫下具體的步驟和時間；b.直接開始做	a:J,b:P
55	對我來說，在社交場合主動和別人說話或總能有話說：a.是件蠻難的事；b.是一件很輕鬆的事	a:I,b:E
56	做一件很多人都做的事情時，我喜歡：a.按常規方法去做；b.自己想出一種新方法	a:S,b:N
57	新認識我的人一般：a.較快就能知道我的興趣所在；b.只有在真正和我熟悉之後才會知道我的興趣	a:N,b:S
58	我通常更喜歡上那些：a.教原理和理論的課；b.有具體應用性的課	a:T,b:F
59	我更欣賞：a.一個真情流露的人；b.一個始終有著理性的人	a:F,b:T
60	我覺得按日程表做事：a.會有好處，但不喜歡；b.很適合自己	a:P,b:J
61	當我和一群人在一起時，我更多的時候是：a.和認識的人一對一地說話；b.參加大家的談話	a:I,b:E
62	參加聚會時，我：a.說的時候多；b.聽別人說的時候多	a:E,b:I
63	為週末要做的事情定一個日程表：a.很合我意；b.讓我感覺很沒意思	a:P,b:J
64	哪一種對我來說是更高的評價：a.有競爭心；b.有同情心	a:T,b:F
65	我通常更喜歡：a.提前安排好社交活動；b.到時候再說	a:J,b:P
66	當我有一個工作量較大的任務時，我往往是：a.先開始做,然後再考慮下一步的任務；b.事先把它拆成一個個小的任務	a:P,b:J
67	我覺得自己：a.只有和那些志趣相投的人才可以保持長時間交談；b.只要願意，和幾乎任何一個人都可以長時間交談	a:I,b:E
68	我更喜歡：a.按大家常用的、已經行之有效的方法做事；b.分析尚有錯誤的地方，並攻克尚未解決的問題	a:S,b:N
69	閒暇讀書時，我：a.更欣賞作者怪異、獨特的表達方式；b.更願意接受作者具體明瞭的表達方式	a:N,b:S
70	我更願意有這樣的老闆：a.寬容仁慈但經常多變的；b.態度嚴厲但總是講理的	a:F,b:T
71	我喜歡按____工作：a.當天的具體情況來安排；b.已定好的時間表	a:P,b:J
72	我通常：a.可以輕鬆地和任何人談很長時間；b.只對某些人或在某些情況下，才會暢所欲言	a:E,b:I
73	在做一個決定時，我會更多的考慮：a.客觀的因素；b.他人的感受和建議	a:T,b:F
74	你更喜歡：a.寧靜的；b.活躍的	a:I,b:E
75	你更喜歡：a.有計畫的；b.無計畫的	a:J,b:P
76	你更喜歡：a.抽象的；b.具體的	a:N,b:S
77	你更喜歡：a.溫和的；b.堅定的	a:F,b:T
78	你更喜歡：a.思想；b.感受	a:N,b:S
79	你更喜歡：a.事實；b.猜想	a:T,b:F
80	你更喜歡：a.衝動；b.果斷	a:F,b:T
81	你更喜歡：a.熱鬧；b.安靜	a:E,b:I
82	你更喜歡：a.恬靜的；b.外向的	a:I,b:E
83	你更喜歡：a.系統的；b.隨意的	a:J,b:P
84	你更喜歡：a.理論推測；b.真憑實據	a:T,b:F
85	你更喜歡：a.敏感細膩；b.公正合理	a:F,b:T
86	你更喜歡：a.以理服人；b.以情動人	a:T,b:F
87	你更喜歡：a.闡述事實；b.表達思想	a:T,b:F
88	你更喜歡：a.不受拘束的；b.有計畫的	a:J,b:P
89	你更喜歡：a.沉默的；b.健談的	a:I,b:E
90	你更喜歡：a.井井有條；b.隨意安排	a:J,b:P
91	你更喜歡：a.理想；b.現狀	a:N,b:S
92	你更喜歡：a.善解人意；b.深謀遠慮	a:F,b:T
93	你更喜歡：a.注重利益；b.注重情感	a:T,b:F
`;

  function parse93(raw) {
    const lines = raw.trim().split('\n');
    return lines.map((line, idx) => {
      const parts = line.split('\t');
      const qa = parts[1] || '';
      const typeInfo = (parts[2] || '').trim();

      const split = qa.split('：');
      const qText = (split[0] || '').trim();
      const optRaw = split[1] ? split.slice(1).join('：') : qa;

      const opts = (optRaw || '').split('；');
      const optA = (opts[0] || '').replace(/^[ab][. ]/i, '').trim();
      const optB = (opts[1] || '').replace(/^[ab][. ]/i, '').trim();

      const m = typeInfo.match(/a\s*:\s*([EISNTFJP])\s*,\s*b\s*:\s*([EISNTFJP])/i);
      const dims = m ? { a: m[1].toUpperCase(), b: m[2].toUpperCase() } : { a: null, b: null };

      return {
        id: idx + 1,
        text: qText,
        optA,
        optB,
        dims,
        typeInfo
      };
    });
  }

  // --- 360 題庫 ---
  const data360_mbti = [
    { id: 1, textA: "先了解別人想法再決定", textB: "不商量就下決定", dimA: 'E', dimB: 'I' },
    { id: 2, textA: "富於想像或憑直覺", textB: "講求精確與事實", dimA: 'N', dimB: 'S' },
    { id: 3, textA: "根據分析做評斷", textB: "了解需要與價值做評斷", dimA: 'T', dimB: 'F' },
    { id: 4, textA: "順著他人意思承諾", textB: "自己做承諾並實踐", dimA: 'P', dimB: 'J' },
    { id: 5, textA: "安靜獨自思考", textB: "與他人打成一片", dimA: 'I', dimB: 'E' },
    { id: 6, textA: "運用熟悉好方法", textB: "嘗試運用新方法", dimA: 'S', dimB: 'N' },
    { id: 7, textA: "合乎邏輯按部就班", textB: "根據體驗及信息", dimA: 'T', dimB: 'F' },
    { id: 8, textA: "訂下最後期限", textB: "擬訂時間表嚴格遵行", dimA: 'P', dimB: 'J' },
    { id: 9, textA: "稍談笑話再思考", textB: "盡興暢談再思考", dimA: 'E', dimB: 'I' },
    { id: 10, textA: "設想各種可能", textB: "按實際情況處理", dimA: 'N', dimB: 'S' },
    { id: 11, textA: "擅長於思考", textB: "敏於感覺", dimA: 'T', dimB: 'F' },
    { id: 12, textA: "事前詳細考慮", textB: "稍作考慮明快決定", dimA: 'P', dimB: 'J' },
    { id: 13, textA: "思想情感不為人知", textB: "與人分享活動", dimA: 'I', dimB: 'E' },
    { id: 14, textA: "喜歡抽象與理論", textB: "喜歡具體與實際", dimA: 'N', dimB: 'S' },
    { id: 15, textA: "協助探索感受", textB: "協助做合理決定", dimA: 'F', dimB: 'T' },
    { id: 16, textA: "答案彈性可修改", textB: "答案明確可預知", dimA: 'P', dimB: 'J' },
    { id: 17, textA: "很少表達內心", textB: "自在表達內心", dimA: 'I', dimB: 'E' },
    { id: 18, textA: "傾向從大處著眼", textB: "喜歡從小處著手", dimA: 'N', dimB: 'S' },
    { id: 19, textA: "憑信念做決定", textB: "分析事實做決定", dimA: 'F', dimB: 'T' },
    { id: 20, textA: "事先詳細計劃", textB: "臨時視需要計劃", dimA: 'J', dimB: 'P' },
    { id: 21, textA: "喜歡結交新朋友", textB: "喜歡獨處或熟人", dimA: 'E', dimB: 'I' },
    { id: 22, textA: "重視概念", textB: "重視事實", dimA: 'N', dimB: 'S' },
    { id: 23, textA: "相信自己想法", textB: "相信證實結論", dimA: 'F', dimB: 'T' },
    { id: 24, textA: "盡量記事", textB: "少用記事", dimA: 'J', dimB: 'P' },
    { id: 25, textA: "團體中討論問題", textB: "自己想出再討論", dimA: 'E', dimB: 'I' },
    { id: 26, textA: "擬定計劃確實執行", textB: "擬定但不一定執行", dimA: 'S', dimB: 'N' },
    { id: 27, textA: "我是理性的", textB: "我是感性的", dimA: 'T', dimB: 'F' },
    { id: 28, textA: "隨心所欲做事", textB: "先了解別人期望", dimA: 'P', dimB: 'J' },
    { id: 29, textA: "喜歡成為焦點", textB: "喜歡退居幕後", dimA: 'E', dimB: 'I' },
    { id: 30, textA: "喜歡自由想像", textB: "傾向檢視實情", dimA: 'N', dimB: 'S' },
    { id: 31, textA: "體驗感人情境", textB: "運用能力分析", dimA: 'F', dimB: 'T' },
    { id: 32, textA: "預定時間內開會", textB: "一切妥當才開會", dimA: 'J', dimB: 'P' }
  ];

  const data360_t1 = [
    { id: 1, pairA: {text:'姿勢手勢多', val:'A1'}, pairB: {text:'姿勢手勢少', val:'A2'} },
    { id: 2, pairA: {text:'說話溫和', val:'B1'}, pairB: {text:'說話大聲', val:'B2'} },
    { id: 3, pairA: {text:'動作灑脫', val:'A1'}, pairB: {text:'動作拘謹', val:'A2'} },
    { id: 4, pairA: {text:'說話慢', val:'B1'}, pairB: {text:'說話快', val:'B2'} },
    { id: 5, pairA: {text:'表情多', val:'A1'}, pairB: {text:'表情少', val:'A2'} },
    { id: 6, pairA: {text:'動作慢', val:'B1'}, pairB: {text:'動作快', val:'B2'} },
    { id: 7, pairA: {text:'音調變化多', val:'A1'}, pairB: {text:'音調變化少', val:'A2'} },
    { id: 8, pairA: {text:'說話後傾', val:'B1'}, pairB: {text:'說話前傾', val:'B2'} },
    { id: 9, pairA: {text:'喜歡接觸人', val:'A1'}, pairB: {text:'喜歡單純工作', val:'A2'} },
    { id: 10, pairA: {text:'意見婉轉', val:'B1'}, pairB: {text:'意見強勢', val:'B2'} },
    { id: 11, pairA: {text:'活潑輕鬆', val:'A1'}, pairB: {text:'嚴肅型', val:'A2'} },
    { id: 12, pairA: {text:'少冒險', val:'B1'}, pairB: {text:'不怕冒險', val:'B2'} },
    { id: 13, pairA: {text:'依感覺決定', val:'A1'}, pairB: {text:'依事實決定', val:'A2'} },
    { id: 14, pairA: {text:'少給壓力', val:'B1'}, pairB: {text:'常給壓力', val:'B2'} },
    { id: 15, pairA: {text:'易露感情', val:'A1'}, pairB: {text:'不易露感情', val:'A2'} },
    { id: 16, pairA: {text:'少眼神接觸', val:'B1'}, pairB: {text:'多眼神接觸', val:'B2'} }
  ];

  const data360_aohc = [
    { id: 1, words: [{type:'C', text:'強力的'}, {type:'O', text:'朝氣蓬勃'}, {type:'H', text:'中庸的'}, {type:'A', text:'老練的'}] },
    { id: 2, words: [{type:'C', text:'積極的'}, {type:'O', text:'情緒化的'}, {type:'H', text:'隨和的'}, {type:'A', text:'一致的'}] },
    { id: 3, words: [{type:'C', text:'直接了當'}, {type:'O', text:'表情豐富'}, {type:'H', text:'和藹可親'}, {type:'A', text:'精確的'}] },
    { id: 4, words: [{type:'C', text:'堅韌的'}, {type:'O', text:'以人為本'}, {type:'H', text:'溫和的'}, {type:'A', text:'完美主義'}] },
    { id: 5, words: [{type:'C', text:'膽大的'}, {type:'O', text:'衝動的'}, {type:'H', text:'親切的'}, {type:'A', text:'謹慎的'}] },
    { id: 6, words: [{type:'C', text:'競爭的'}, {type:'O', text:'情感豐富'}, {type:'H', text:'支持的'}, {type:'A', text:'準確的'}] },
    { id: 7, words: [{type:'C', text:'冒險者'}, {type:'O', text:'健談的'}, {type:'H', text:'輕鬆的'}, {type:'A', text:'確實的'}] },
    { id: 8, words: [{type:'C', text:'好議論'}, {type:'O', text:'喜愛有趣'}, {type:'H', text:'耐心的'}, {type:'A', text:'邏輯的'}] },
    { id: 9, words: [{type:'C', text:'勇敢的'}, {type:'O', text:'不做作的'}, {type:'H', text:'穩定的'}, {type:'A', text:'組織性'}] },
    { id: 10, words: [{type:'C', text:'負責的'}, {type:'O', text:'樂觀的'}, {type:'H', text:'體貼的'}, {type:'A', text:'周全的'}] },
    { id: 11, words: [{type:'C', text:'率直的'}, {type:'O', text:'興高采烈'}, {type:'H', text:'忠心的'}, {type:'A', text:'嚴肅的'}] },
    { id: 12, words: [{type:'C', text:'獨立的'}, {type:'O', text:'狂熱的'}, {type:'H', text:'好傾聽者'}, {type:'A', text:'高標準'}] }
  ];

  window.QUESTION_BANK = {
    q93: parse93(raw93Questions),
    q360: {
      mbti: data360_mbti,
      t1: data360_t1,
      aohc: data360_aohc
    }
  };
})();

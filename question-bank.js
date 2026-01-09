/* question-bank.js
 * 題庫資料集中管理：93 題 + 360 題庫
 * - 不用 fetch，file:// 也能跑
 * - Alpine app 直接讀 window.QUESTION_BANK
 */
(function () {
  // --- 93 題  ---
// --- 93 題 原始資料（優化白話版） ---
  const raw93Questions = `
1	當某天想去一個地方玩時，我通常會：a.出發前先查好攻略、排好行程；b.去了再說，看心情行動	a:J,b:P
2	我覺得自己比較像是：a.隨遇而安、見招拆招的人；b.喜歡按表操課、遵循計畫的人	a:P,b:J
3	如果我是一位老師，我更喜歡教：a.注重事實與實務的課程；b.注重理論與概念的課程	a:S, b:N
4	在社交場合中，我通常是：a.容易和大家打成一片的人；b.話不多，比較安靜的人	a:E, b:I
5	我通常和哪種人相處較好：a.天馬行空、愛想像的人；b.腳踏實地、講求現實的人	a:N, b:S
6	我覺得自己做決定時：a.更重視人情與感受；b.更重視邏輯與理智	a:F,b:T
7	我做事更喜歡：a.看當下興致決定；b.按照事先計畫進行	a:P,b:J
8	我感覺自己：a.很容易被別人看透或理解；b.很難被別人看透或理解	a:E,b:I
9	按日程表或清單做事：a.正合我意，讓我很安心；b.讓我覺得被束縛，很不自在	a:J,b:P
10	當有一件具體的工作要做時，我喜歡：a.事先規劃好，寫下時間表執行；b.邊做邊看，隨時調整	a:J,b:P
11	在多數情況下，我更喜歡：a.想到哪做到哪，保持彈性；b.按日程表執行，不喜歡被打亂	a:P,b:J
12	大多數人認為我是一個：a.注重隱私，不太把事情告訴別人的人；b.直率坦誠，暢所欲言的人	a:I,b:E
13	我更願意被別人看成是：a.一個注重實際、辦事牢靠的人；b.一個足智多謀、創意豐富的人	a:S,b:N
14	在一群人中，我通常：a.容易主動去認識新朋友；b.更多時候等著別人來找我說話	a:E,b:I
15	我更願意和哪種人交朋友：a.總能有創新想法、鬼點子多的人；b.腳踏實地、實事求是的人	a:N,b:S
16	決策時，我更傾向於：a.考慮人的感受與和諧；b.考慮事情的邏輯與合理性	a:F,b:T
17	我做事情更喜歡：a.先看一看有什麼新情況後再作打算；b.盡早就把事情定下來，不喜歡懸而未決	a:P,b:J
18	更多的時候，我喜歡：a.自己一個人獨處充電；b.和大家在一起熱鬧	a:I,b:E
19	身邊有很多人時：a.會令我變得更有精神；b.會令我感到能量耗盡、疲於應付	a:E,b:I
20	對於週末或旅遊，我更喜歡：a.早一點就把時間和行程定下來；b.到時候再看心情決定	a:J,b:P
21	在旅行時，我更喜歡：a.根據當下情況安排活動；b.事先就想清楚一整天的活動	a:P,b:J
22	在大型社交聚會中，我往往：a.會感到厭煩、疲倦，想早點回家；b.能過得高興、盡興，捨不得走	a:I,b:E
23	我更喜歡：a.和他人互動交往；b.和自己的內心對話	a:E,b:I
24	我更喜歡和哪種人打交道：a.想法新奇、跳躍思考的人；b.講話有憑有據、遵循常理的人	a:N,b:S
25	在日常工作中，我更喜歡：a.在時間緊迫的情況下，享受衝刺的快感；b.早作計畫並盡早完成，不喜歡壓死線	a:J,b:P
26	我覺得別人通常：a.要花較長的時間才能真正認識我；b.很快就能和我混熟	a:I,b:E
27	你更喜歡：a.實際具體的東西；b.理論抽象的概念	a:S,b:N
28	你比較喜歡：a.擁有少數幾個知心好友；b.擁有很多認識的朋友	a:I,b:E
29	你做事比較傾向：a.井井有條、按部就班；b.隨機應變、即興發揮	a:J,b:P
30	你更喜歡：a.腦中想像出來的世界；b.眼見為憑的現實世界	a:N,b:S
31	別人通常怎麼形容你：a.溫暖親切的；b.客觀冷靜的	a:F,b:T
32	做決定時，你覺得什麼更重要：a.是否公平公正；b.是否有人情味	a:F,b:T
33	你比較喜歡哪種過程：a.按圖施工，把東西做出來 (建造)；b.發想新點子，設計沒見過的東西 (發明)	a:T,b:F
34	你更喜歡自己是：a.安靜穩重的；b.好交際、活躍的	a:I,b:E
35	你更看重：a.理論架構；b.事實依據	a:T,b:F
36	你更依賴什麼來做判斷：a.同情與憐憫心；b.邏輯與法則	a:F,b:T
37	你更擅長：a.邏輯分析；b.感受氛圍	a:T,b:F
38	你認為自己更偏向：a.理智多思；b.細膩善感	a:T,b:F
39	你更喜歡：a.發揮想像力；b.處理實際事務	a:N,b:S
40	你比較欣賞哪種特質：a.慷慨仁慈的；b.立場堅定的	a:F,b:T
41	對待他人時，你傾向：a.一視同仁、照章辦事；b.體恤個人需求、給予照顧	a:F,b:T
42	你更喜歡：a.有產出、有結果的工作；b.有創意、發想類的工作	a:J,b:P
43	你更關注：a.未來的可能性；b.當下的必然性	a:J,b:P
44	你希望別人認為你：a.溫暖關懷；b.堅強有力	a:F,b:T
45	做選擇時，你更看重：a.實用價值；b.情感上的滿足	a:T,b:F
46	你更喜歡：a.動手製作成品；b.動腦規劃設計	a:T,b:F
47	你更喜歡：a.新奇未知的東西；b.已知熟悉的事物	a:N,b:S
48	當朋友有難，原本的反應通常是：a.給予同情與安慰；b.幫忙分析問題與解決方案	a:F,b:T
49	你更欣賞哪種性格：a.意志堅定的；b.心腸柔軟的	a:T,b:F
50	你更習慣：a.直觀的感受；b.抽象的思考	a:N,b:S
51	你覺得哪種特質更可貴：a.忠誠與情感；b.堅定與原則	a:F,b:T
52	你比較像哪一種：a.具競爭性、好勝；b.好心腸、與世無爭	a:F,b:T
53	你更重視：a.實用性；b.創新性	a:T,b:F
54	當我有一項重要工作需要在一個星期內完成時，我會：a.事先寫下具體的步驟和時間表；b.直接開始做，見招拆招	a:J,b:P
55	對我來說，在社交場合主動和別人說話或總能有話說：a.是件蠻難的事，會有點尷尬；b.是一件很輕鬆自然的事	a:I,b:E
56	做一件很多人都做的事情時，我喜歡：a.按大家常用的常規方法去做；b.自己想出一種新方法去做	a:S,b:N
57	新認識我的人一般：a.較快就能知道我的興趣所在；b.只有在真正和我熟悉之後才會知道我的興趣	a:N,b:S
58	我通常更喜歡上那些：a.探討原理和理論的課；b.有具體應用性、能學到操作的課	a:T,b:F
59	我更欣賞：a.一個真情流露、感性的人；b.一個始終保持理性、冷靜的人	a:F,b:T
60	我覺得按日程表做事：a.雖然有好處，但我不喜歡被綁住；b.很適合自己，讓生活有序	a:P,b:J
61	當我和一群人在一起時，我更多的時候是：a.和認識的人一對一地說話；b.加入大家的大話題一起聊	a:I,b:E
62	參加聚會時，我：a.說話的時候多；b.聽別人說話的時候多	a:E,b:I
63	為週末要做的事情定一個日程表：a.很合我意；b.讓我感覺很沒意思、像在工作	a:P,b:J
64	哪一種對我來說是更高的評價：a.這個人很有能力、競爭力；b.這個人很有同情心、人很好	a:T,b:F
65	我通常更喜歡：a.提前安排好社交活動；b.到時候再說，隨興一點	a:J,b:P
66	當我有一個工作量較大的任務時，我往往是：a.先開始做，邊做邊想下一步；b.事先把它拆成一個個小的任務，按部就班	a:P,b:J
67	我覺得自己：a.只有和那些志趣相投的人才可以聊很久；b.只要願意，和幾乎任何一個人都可以聊很久	a:I,b:E
68	我更喜歡：a.按大家常用的、已經行之有效的方法做事；b.分析現有問題，嘗試解決沒人解開的難題	a:S,b:N
69	閒暇讀書時，我：a.更欣賞作者怪異、獨特、富含隱喻的表達方式；b.更願意接受作者具體明瞭、直話直說的表達方式	a:N,b:S
70	我更願意有這樣的老闆：a.寬容仁慈，但決策可能經常用改的；b.態度嚴厲，但總是講理且標準一致的	a:F,b:T
71	我喜歡按什麼方式工作：a.看當天的具體情況或心情來安排；b.按照已定好的時間表執行	a:P,b:J
72	我通常：a.可以輕鬆地和任何人談很長時間；b.只對某些人或在某些情況下，才會暢所欲言	a:E,b:I
73	在做一個決定時，我會更多的考慮：a.客觀的事實與數據；b.他人的感受和建議	a:T,b:F
74	你更喜歡哪種生活步調：a.寧靜獨處的；b.活躍熱鬧的	a:I,b:E
75	你更喜歡：a.有計畫的行事；b.無計畫的隨興	a:J,b:P
76	你比較擅長處理：a.抽象的概念；b.具體的事物	a:N,b:S
77	你通常是：a.溫和隨和的；b.堅定有主見的	a:F,b:T
78	你更看重：a.思想與觀念；b.感受與體驗	a:N,b:S
79	你更重視：a.既定事實；b.未來的猜想或可能性	a:T,b:F
80	你更喜歡：a.隨心而動 (衝動)；b.當機立斷 (果斷)	a:F,b:T
81	你更喜歡：a.熱鬧的場合；b.安靜的場合	a:E,b:I
82	你更傾向：a.內斂恬靜；b.外向活潑	a:I,b:E
83	你做事比較：a.系統化、有條理；b.隨意、看狀況	a:J,b:P
84	你更相信：a.理論推測；b.真憑實據	a:T,b:F
85	哪種形容詞比較像你：a.敏感細膩；b.公正合理	a:F,b:T
86	你習慣：a.以理服人；b.以情動人	a:T,b:F
87	你更喜歡：a.闡述事實細節；b.表達思想概念	a:T,b:F
88	你更喜歡：a.不受拘束的彈性；b.有計畫的安排	a:J,b:P
89	在團體中，你是：a.比較沉默的；b.比較健談的	a:I,b:E
90	你的房間或辦公桌通常：a.井井有條；b.隨意擺放 (亂中有序)	a:J,b:P
91	你更關注：a.未來的理想；b.目前的現狀	a:N,b:S
92	你覺得自己更具備：a.善解人意的心；b.深謀遠慮的腦	a:F,b:T
93	做選擇時，你傾向：a.注重利益與成效；b.注重情感與關係	a:T,b:F
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
// --- 360 題庫 (優化白話版) ---
  const data360_mbti = [
    { id: 1, textA: "先了解別人想法再決定", textB: "不與人商量，自己下決定", dimA: 'E', dimB: 'I' },
    { id: 2, textA: "富於想像或憑直覺", textB: "講求精確與具體事實", dimA: 'N', dimB: 'S' },
    { id: 3, textA: "根據邏輯分析做評斷", textB: "根據個人價值觀做評斷", dimA: 'T', dimB: 'F' },
    { id: 4, textA: "看狀況順著他人意思承諾", textB: "做出承諾後就會嚴格實踐", dimA: 'P', dimB: 'J' },
    { id: 5, textA: "喜歡安靜獨自思考", textB: "喜歡與他人打成一片", dimA: 'I', dimB: 'E' },
    { id: 6, textA: "運用熟悉且有效的老方法", textB: "嘗試運用創新的新方法", dimA: 'S', dimB: 'N' },
    { id: 7, textA: "合乎邏輯、按部就班", textB: "根據體驗、感受及信息", dimA: 'T', dimB: 'F' },
    { id: 8, textA: "隨性工作，最後期限前趕完", textB: "擬訂時間表，按進度嚴格遵行", dimA: 'P', dimB: 'J' },
    { id: 9, textA: "稍作寒暄後就開始思考正事", textB: "盡興暢談後才開始思考正事", dimA: 'E', dimB: 'I' },
    { id: 10, textA: "設想各種未來的可能性", textB: "按眼前的實際情況處理", dimA: 'N', dimB: 'S' },
    { id: 11, textA: "擅長於理性思考", textB: "敏銳於他人感覺", dimA: 'T', dimB: 'F' },
    { id: 12, textA: "事前詳細考慮各種變數", textB: "稍作考慮，快速明快決定", dimA: 'P', dimB: 'J' },
    { id: 13, textA: "思想情感保留在心，不為人知", textB: "樂於與人分享活動與感受", dimA: 'I', dimB: 'E' },
    { id: 14, textA: "喜歡抽象概念與理論", textB: "喜歡具體事物與實際操作", dimA: 'N', dimB: 'S' },
    { id: 15, textA: "協助他人探索內心感受", textB: "協助他人做合理的決定", dimA: 'F', dimB: 'T' },
    { id: 16, textA: "答案保持彈性，隨時可修改", textB: "答案明確固定，最好可預知", dimA: 'P', dimB: 'J' },
    { id: 17, textA: "很少主動表達內心想法", textB: "自在且主動表達內心想法", dimA: 'I', dimB: 'E' },
    { id: 18, textA: "傾向從大處(整體概念)著眼", textB: "喜歡從小處(具體細節)著手", dimA: 'N', dimB: 'S' },
    { id: 19, textA: "憑信念與價值觀做決定", textB: "分析事實與利弊做決定", dimA: 'F', dimB: 'T' },
    { id: 20, textA: "事先詳細計劃", textB: "臨時視需要才計劃", dimA: 'J', dimB: 'P' },
    { id: 21, textA: "喜歡結交新朋友", textB: "喜歡獨處或只跟熟人在一起", dimA: 'E', dimB: 'I' },
    { id: 22, textA: "重視概念與創意", textB: "重視事實與數據", dimA: 'N', dimB: 'S' },
    { id: 23, textA: "相信自己的想法與感受", textB: "相信已被證實的結論", dimA: 'F', dimB: 'T' },
    { id: 24, textA: "盡量用紙筆/工具記事", textB: "少用記事，記在腦中", dimA: 'J', dimB: 'P' },
    { id: 25, textA: "喜歡在團體中討論問題", textB: "自己想出答案後再討論", dimA: 'E', dimB: 'I' },
    { id: 26, textA: "擬定計劃後確實執行", textB: "擬定歸擬定，不一定執行", dimA: 'S', dimB: 'N' },
    { id: 27, textA: "我是理性的", textB: "我是感性的", dimA: 'T', dimB: 'F' },
    { id: 28, textA: "隨心所欲做事，保持彈性", textB: "先了解別人期望，按規矩做", dimA: 'P', dimB: 'J' },
    { id: 29, textA: "喜歡成為眾人焦點", textB: "喜歡退居幕後", dimA: 'E', dimB: 'I' },
    { id: 30, textA: "喜歡自由想像", textB: "傾向檢視實情", dimA: 'N', dimB: 'S' },
    { id: 31, textA: "體驗感人情境", textB: "運用能力分析", dimA: 'F', dimB: 'T' },
    { id: 32, textA: "時間到就開會，不等人", textB: "一切妥當、人到齊才開會", dimA: 'J', dimB: 'P' }
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

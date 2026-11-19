// 特集を編集する場合は該当する季節の写真ファイル名・見出し・リンクを更新します。
// 空欄にすると日本時間の月で自動選択。キャンペーン時のみ "spring" 等を指定。
window.FEATURED_SEASON = "";
const shop = "https://4seasons-foryou.com";
const browse = (q) => shop + "/search?type=product&q=" + encodeURIComponent(q);
window.SEASONAL_EDIT = {
  spring: {
    edition:"SPRING / 01", hero:"春の贈りもの", kicker:"新生活・春のお祝い", title:["新しい日々に、","小さなお祝いを。"],
    description:"引っ越しや新生活のお祝いに。毎日の食卓や台所で、さりげなく役に立つものを。",
    label:"春の贈り物を見る", link:shop + "/collections/gift_spring",
    picks:[["春のうつわ","spring.webp",browse("食器")],["ふきん・キッチンクロス","lab.webp",shop+"/collections/fukin"]]
  },
  summer: {
    edition:"SUMMER / 02", hero:"夏の贈りもの", kicker:"夏のご挨拶・お中元", title:["涼しさを、","ひとつ贈る。"],
    description:"暑い日に、涼やかな音や冷たい一杯を。夏のひと休みが楽しみになる贈り物。",
    label:"夏の贈り物を見る", link:shop + "/collections/gift_summer",
    picks:[["涼を呼ぶ風鈴","chime.webp",browse("風鈴")],["夏のひと休みに、水出し珈琲","summer-cold-brew-tall.webp",shop+"/products/fujieda-c-1502-0175"]]
  },
  autumn: {
    edition:"AUTUMN / 03", hero:"秋の贈りもの", kicker:"秋のお礼・敬老の日", title:["深まる季節に、","ほっとするものを。"],
    description:"秋の食卓を楽しむ器や、ひと息つく時間のお茶。ふだんの感謝を伝える品を選びました。",
    label:"秋の贈り物を見る", link:shop + "/collections/gift_autumn",
    picks:[["秋の食卓を彩るうつわ","autumn.webp",browse("食器")],["一服を楽しむお茶","tea.webp",shop+"/collections/coffee-tea"]]
  },
  winter: {
    edition:"WINTER / 04", hero:"冬の贈りもの", kicker:"お歳暮・冬のご挨拶", title:["ぬくもりを、","手渡す冬。"],
    description:"一年分のありがとうに、冬のぬくもりを。やわらかなニットと、炊きたてのごはんが楽しみになる土鍋を選びました。",
    label:"冬の贈り物を見る", link:shop + "/collections/gift_winter",
    picks:[["冬にうれしいニット","knit.webp",browse("五泉ニット")],["炊きたてのごはんを囲む冬","winter-rice-pot-steam.webp",shop+"/products/k-1412-0086-02"]]
  }
};

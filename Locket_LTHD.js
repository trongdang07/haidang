// ========= ID ========= //
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};
// =========   Phần cố định  ========= // 
// =========  @DuongVanSy ========= // 
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var dvsteam = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2007-09-30T09:45:00Z",
  purchase_date: "2007-09-30T09:45:00Z",
  store: "app_store"
};

var dvsteam_subscription = {
  grace_period_expires_date: null,
  purchase_date: "2024-11-11T09:45:00Z",
  product_identifier: "com.dvsteam.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
  let [entitlement, product] = mapping[match];
  if (product) {
    dvsteam_subscription.product_identifier = product;
    obj.subscriber.subscriptions[product] = dvsteam;
  } else {
    obj.subscriber.subscriptions["com.dvsteam.premium.yearly"] = dvsteam;
  }
  obj.subscriber.entitlements[entitlement] = dvsteam_subscription;
} else {
  obj.subscriber.subscriptions["com.dvsteam.premium.yearly"] = dvsteam;
  obj.subscriber.entitlements.pro = dvsteam_subscription;
}

$done({ body: JSON.stringify(obj) });

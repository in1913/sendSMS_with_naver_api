import crypto from 'crypto';

const naverApiHeader = (NAVER_ACCESS_KEY, NAVER_SECRET_KEY, url, method) => {

    const getTimestamp = () => {
        const now = new Date();
        //now.setHours(now.getHours() + 9); // 한국 시간대(KST)로 설정
        return now.getTime().toString();
    };

    const getSignature = (timestamp, method, url) => {
        const space = " ";
        const newLine = "\n";
        const hmac = crypto.createHmac("sha256", NAVER_SECRET_KEY)
            .update(method + space + url + newLine + timestamp + newLine + NAVER_ACCESS_KEY);
        const hash = hmac.digest("base64");

        return hash;
    }

    const timestamp = getTimestamp();
    const signature = getSignature(timestamp, method, url);
    

    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-iam-access-key": NAVER_ACCESS_KEY,
        "x-ncp-apigw-signature-v2": signature,
    };

    return headers;
};

export default naverApiHeader;
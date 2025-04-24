interface TextToImageRequest {
  prompt: string;
  steps?: number;
}

interface TextToImageResponse {
  image: string;
}

interface TextToImageConfig {
  accountId: string;
  apiToken: string;
}

/**
 * 使用Cloudflare AI API生成图片
 * @param config - Cloudflare配置信息
 * @param request - 生成图片的请求参数
 * @returns 返回Base64格式的图片数据
 */
export async function generateImage(
  request: TextToImageRequest
): Promise<TextToImageResponse> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

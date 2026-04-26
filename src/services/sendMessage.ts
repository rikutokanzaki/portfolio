type MessageData = {
  url?: string;
  name: string;
  email: string;
  message: string;
}

type SendMessageResponse = {
  ok: boolean;
  data: { success?: boolean; error?: string };
}

export const sanitizeMessageForHtml = (text: string) => {
  return text.replace(/\r\n/g, '\n')
}

export const sendMessage = async (
  { url = "", name, email, message }: MessageData,
): Promise<SendMessageResponse> => {
  const apiEndpoint = url || process.env.NEXT_PUBLIC_API_ENDPOINT || "";

  if (!apiEndpoint) {
    throw new Error("NEXT_PUBLIC_API_ENDPOINT is not configured");
  }

  const messageContent = {
    name: name.trim(),
    email: email.trim(),
    message: sanitizeMessageForHtml(message),
  };

  const response = await fetch(`${apiEndpoint}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messageContent),
  });

  const responseJson = await response
    .json()
    .catch(() => ({ error: "Invalid response from contact API" }));

  const isSuccess =
    response.ok &&
    typeof responseJson === "object" &&
    responseJson !== null &&
    "success" in responseJson &&
    responseJson.success === true;

  return {
    ok: isSuccess,
    data: responseJson as { success?: boolean; error?: string },
  };
}

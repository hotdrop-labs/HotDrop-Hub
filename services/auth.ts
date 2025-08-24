export type LoginInput = {email?: string, password?: string}


export async function loginRequest(
    base_url: string,
    data: LoginInput
): Promise<{token: string; user: any}>{    
    const res = await fetch(`${base_url}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const response = await res.json();
    console.log(response)
    if (!res.ok) throw new Error(response?.message || "Login failed");
    return response
}
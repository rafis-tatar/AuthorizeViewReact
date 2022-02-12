export interface loginResponse
{
    result: |tokenResponse,
    success: boolean
}

export interface tokenResponse
{
    accessToken: string,
    refreshToken: string,
    userName: string
}
# Curl

Curl details

## curl

this is a request controller with automatic return in json and rate limit

```ts
interface ICurlAdditionalOption {
    rate: number
}

type ICurlRequest = request.CoreOptions & request.UrlOptions & ICurlAdditionalOption
type ICurlResponse = { error: any, response: request.Response, body: any }

class Curl {
    constructor(options: ICurlRequest)

    getOptions(): ICurlRequest
    setOptions(options: ICurlRequest): Curl
    get(): Promise<ICurlResponse>
    static get(options: ICurlRequest): Promise<ICurlResponse>
    post(): Promise<ICurlResponse>
    static post(options: ICurlRequest): Promise<ICurlResponse>
    put(): Promise<ICurlResponse>
    static put(options: ICurlRequest): Promise<ICurlResponse>
    delete(): Promise<ICurlResponse>
    static delete(options: ICurlRequest): Promise<ICurlResponse>
    request(): Promise<ICurlResponse>
}
```

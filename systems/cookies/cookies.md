# Cookies

- Cookies are comprised of key, value pairs which control when and where the cookie is used. When a user agent makes a request to the server, the user agent uses metadata to determine which key/value cookies to include in the header. 
- For historical reasons cookies contain certain misleading attributes, such as the `secure` attribute. 
	- When a cookie is secure, it does not provide integrity against a network attack.
	- These attributes are handy for providing secure protections for the session identifier rather than the network. 

Cookies for a given host are shared across all ports on the host. The same origin policy is used to retrieve content via different ports with cookies, hence all ports know of the cookies.

To store state cookies on the user-agemnt, the origin server includes a `setCookie()` header in an HTTP response. This sets a cookie in the user agent which is then used in subsequent requests back to the origin server for content. 

- When creating responses from the server it is okay to include multiple `setCookie()` methods, but never fold multiple header fields into one header field. 
	- i.e. do not set two cookies with one method.


Cookies can only be modified from the server - on the client side of things a user agent can only do what the cookie gives it consent to do.

## Server Cookie Interaction

- Sets cookies on the user-agent by sending using the `setCookie()` to send cookies in a response. 
- Deletes cookies by sending a `setCookie()` method with an expiration date in the past with matching domains and paths.

## User Agent Cookie Interaction

- user-agents should not produce two attributes with the same name in the same set-cookie string.
	- If a user-agent receives duplicate name, the original cookie is overwritten.

## Cookie Attributes

Below are some of the popular attributes you can / should set on a cookie:

| Name | Description | 
|---|---|
| Path | The scope** of a cookie is limited to a set of paths. The user-agent will include the cookie in a HTTP request only if the path portion of the URI matches, or is a subdirectory of the cookie's path attribute. **It is useful for isolating cookies, but is not a reliable security measure.**|
| Secure | Limits the scope of the cookie to "secure" channels. Secure is defined by the user-agent and can direct a cookie to be sent over a HTTP protocol or Transport Layer Security. This attribute protects  only the cookie's confidentiality. |
| HttpOnly | Limits the scope of the cookie to only HTTP requests. This attribute instructs the user-agent to omit the cookie when providing access to non-http cookies. |
| [SameSite](#samesite-settings) | Limits the scope of the cookie such that it will only be attached to requests if the requests originate from the same site (domain/path). |
> <sup>**Scope refers to the pages that a cookie can act on as specified in the uri.</sup>

### SameSite Settings

When a cookie has the `sameSite` attribute set, there are several options available to use:

- `SameSite=Strict`: Cookie only sent with same-site requests.
- `SameSite=Lax`: Cookie sent with same-site requests, and with cross-site requests to top level navigation.
- `SameSite=None`: Cookie sent with same-site requests, and with cross site requests.

___

## References

- Barth, A. (2011, April). HTTP State Management Mechanism. Retrieved from https://tools.ietf.org/html/rfc6265
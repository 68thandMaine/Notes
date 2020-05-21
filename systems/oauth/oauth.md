# O Auth Authentication Framework 2.0

In March of 2020 Safari released version 13.1 which included additional security updates to Webkit. At the time I was working at [Renew Financial](https://www.renewfinancial.com) as a frontend developer and was tapped to address an issue stemming from the update. 

Users who accessed Renew Financial tools through Safari were unable to be correctly redirected to the application due to a `rack.session` cookie not being set. The full extent of the bug is beyond the scope of this document, but I did look into the relationship between authentication and cookies which produced these notes.

| Section | Description | Section | Description |
|---|---|---|---|
|[Motivation](#motivation)| Describes the motivation behind the protocol and the **roles** of the entities in the protocol.| [Implicit Grant System](#implicit-grant-system)| Describes one of the OAuth 2.0 patterns used to authenticate users. |
|[Flows](#flows)| Short description of how the protocol works. |[]() | |

___

## Motivation

The [OAuth protocol](https://oauth.net/) provides a secure way of authenticating user credentials through tokens rather than clear text information like usernames or passwords _(Hardt, 2012)_. The protocol involves four entities, roles, parties...basically there are four moving parts needed in for the protocol to work:

### Roles in 0Auth

| Role | Description |
|---|---|
| __Resource Owner__ | An entity capable of granting access to a protected resource. If it's a person, then the resource owner is the end user. |
| __Resource Server__ | The server hosting the protected resources. The resource server is capable of accepting, and responding to requests to view the protected content via access tokens. |
| __Client__ | An application making protected resource requests on behalf of the __resource owner__ and with its authorization. |
| __Authorization Server__ | The server issuing access tokens to the client after successfully authenticating the resource owner and obtaining authorization. |
> The _resource server_ is likely the server the developer wrote.

## Flows

There are a few different flows that can be used, but the most widely used method involves __using the authorization server as an intermediary between the client and the resource owner__ (see figure 1). 

__Resource Owner => Client => Auth Server => Client => Resource Owner <= Resource Server____

> _**(fig 1. successful login)** A user (resource owner) provides input to the client which is directed to a third party authorization service. If the credentials are accepted then the resource owner is given an access token that the client uses to communicate with the protected content on the resource server._

- The client must provide a redirect URI to the authentication server which usually be the page of the application you want a user to see after a successful login.
- The client can include a `response type` header in the request to the authorization service to specify the flow to use when creating tokens.

## Implicit Grant System

In order for the Implicit Grant System to work, the user agent of the client must be capable of receiving incoming requests via redirection from the authorization server.

- Does not accept refresh tokens.
- **Used to obtain access tokens**
- Client receives access token as a result of a success authorization request. This token is then encoded into the redirect url.


___

## References

- About the security content of Safari 13.1. (2020, April 5). Retrieved from https://support.apple.com/en-us/HT211104
- Hardt, D. (2012, October). The OAuth 2.0 Authorization Framework. Retrieved from https://tools.ietf.org/html/rfc6749
- Wilander, J. (2020, April 9). Full Third-Party Cookie Blocking and More. Retrieved from https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/
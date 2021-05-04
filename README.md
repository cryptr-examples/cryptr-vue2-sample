# Cryptr with Vue2

## 08 InvitationIntegration

To be able to handle invitation on Vue app, some things has to be done.

1. Ensure that your `VueRouter` has  `model 'history'`
2. Handle invitation adding the following block in your `created()` function

```typescript
this.canHandleInvitation = !this.isAuthenticated && this.client.canHandleInvitation();

try {
//... to before catch
else if (this.canHandleInvitation) {
  await this.client.handleInvitationState();
}
```

3. Update `CryptrGuard` to avoid early sign in redirect

```typescript
const invitationPresence = () => {
  return cryptr.client.canHandleInvitation()
}
//...
cryptr.$watch("loading", (loading) => {
  if (!loading) {
    return !invitationPresence() && !signinUnlessAuthenticated();
  }
});
```

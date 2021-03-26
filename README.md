# Cryptr with Vue2

## 06 Decode your user data

Cryptr user data can be decoded easily, try the following code inside your profile page:

```javascript
<template>
  <div class="profile">
    <h1>This is an profile page</h1>
    <ul>
      <li>
        <small>{{ $cryptr.user.sub }}</small>
      </li>
      <li>{{ $cryptr.user.email }}</li>
    </ul>
  </div>
</template>
```

That's all, I hope this was helpful, and thanks for reading! 🙂

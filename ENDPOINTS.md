# URL Endpoints

Base URL: `http://localhost:3000`

## Users

| Method | URL | Handler | Required Input |
|---|---|---|---|
| GET | `/users/:id` | `get_user_by_id` | Path: `id` |
| POST | `/users` | `create_user` | Body: `name` |
| PATCH | `/users/:id` | `update_user` | Path: `id`, Body: `name` |
| DELETE | `/users/:id` | `delete_user` | Path: `id` |

## Wallets

| Method | URL | Handler | Required Input |
|---|---|---|---|
| POST | `/wallets` | `create_wallet` | Body: `name`, `user_id` |
| GET | `/wallets` | `get_wallets` | None |
| GET | `/wallets/:id` | `get_wallet_by_id` | Path: `id` |
| PUT | `/wallets/:id` | `update_wallet` | Path: `id`, Body: `name` |
| DELETE | `/wallets/:id` | `delete_wallet` | Path: `id` |
| POST | `/wallets/:id/deposit` | `deposit_to_wallet` | Path: `id`, Body: `amount` (positive integer) |
| POST | `/wallets/:id/withdraw` | `withdraw_from_wallet` | Path: `id`, Body: `amount` (positive integer) |

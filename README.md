# NestJS Infrastructure Report

## Application Config

- Clean Architecture
- NestJS
- Drizzle ORM
- MySQL

## E-Commerce

### 요구사항

1. **포인트 조회**
   - 사용자는 현재 보유한 포인트를 조회할 수 있어야 한다.

2. **포인트 충전**
   - 사용자는 포인트를 충전할 수 있어야 한다.
   - 최대 충전 후 잔액은 1,000,000 포인트로 제한된다.
   - 충전할 수 있는 최대 포인트는 제한이 없다.
   - 충전할 수 있는 최소 포인트는 1 포인트이다.

3. **상품 조회**
   - 사용자는 상품을 1페이지 당 20개씩 조회할 수 있어야 한다.
   - 사용자는 판매량이 많은 상품의 상위 10개를 조회할 수 있어야 한다.

4. **상품 주문**
   - 사용자는 상품 상세 페이지에서 상품을 주문할 수 있어야 한다.
   - 주문의 필수 정보는 가격, 수량이 있다.
   - 주문 시 상품의 재고가 없으면 주문할 수 없다.

5. **상품 결제**
   - 결제 후 포인트가 차감된다.
   - 결제 후 상품의 재고가 차감된다.
   - 결제 후 상품의 판매량이 증가된다.
   - 결제 후 주문 내역이 생성된다.
   - 포인트가 부족하면 결제에 실패한다.
   - 결제 진행 전 재고가 없으면 주문할 수 없다.

## Sequence Diagram

### 1. 포인트 조회

```mermaid
sequenceDiagram

  actor User

  User ->>+ Point Service: 포인트 조회 요청
  Point Service ->>+ Point Repository: 포인트 조회
  Point Repository -->>- Point Service: 현재 포인트 반환
  Point Service -->>- User: 포인트 조회에 대한 응답
```

### 2. 포인트 충전

```mermaid
sequenceDiagram

  actor User

  User ->>+ Point Service: 포인트 충전 요청
  Point Service ->> Point Service: 충전 포인트 확인

  alt 충전 포인트가 0이하
    Point Service -->> User: 충전 포인트에 대한 응답
  end

  Point Service ->> Point Service: 현재 잔액과 충전 포인트 합산

  alt
    Point Service -->> User: 최대 잔액 초과에 대한 응답
  end

  Point Service ->>+ Point Repository: 포인트 충전
  alt 포인트 충전 실패
    Point Service ->> Point Repository: 포인트 Rollback
    Point Service -->> User: 포인트 충전 실패에 대한 응답
  end
  Point Repository -->>- Point Service: 충전 후 포인트 반환
  Point Service -->>- User: 포인트 충전에 대한 응답
```

### 3. 상품 조회

```mermaid
sequenceDiagram

  actor User

  User ->>+ Product Service: 상품 조회 요청
  Product Service ->>+ Product Repository: 상품 조회
  Product Repository -->>- Product Service: 상품 목록 반환
  Product Service -->>- User: 상품 조회에 대한 응답
```

### 4. 상품 주문
  
```mermaid
sequenceDiagram

  actor User

  User ->>+ Order Service: 상품 주문 요청
  Order Service ->> Order Service: 주문 가능 여부 확인
  alt 재고 부족
    Order Service -->> User: 주문 실패에 대한 응답
  end
  Order Service ->>+ Order Repository: 주문 생성
  alt 주문 생성 실패
    Order Service ->> Order Repository: 주문 정보 Rollback
    Order Service -->> User: 주문 실패에 대한 응답
  end
  Order Repository -->>- Order Service: 주문 정보 반환
  Order Service -->>- User: 주문에 대한 응답
```

### 5. 상품 결제

```mermaid
sequenceDiagram

  actor User

  User ->>+ Payment Service: 상품 결제 요청
  Payment Service ->> Payment Service: 결제 가능 여부 확인
  alt 포인트 부족
    Payment Service -->> User: 결제 실패에 대한 응답
  end
  alt 재고 부족
    Payment Service -->> User: 결제 실패에 대한 응답
  end
  Payment Service ->> Payment Repository: 주문 정보가 있는지 확인

  alt 주문 정보 없음
    Payment Repository -->> Payment Service: 주문 정보 없음
    Payment Service -->> User: 결제 실패에 대한 응답
  end

  Payment Service ->>+ Payment Repository: 결제 생성
  alt 결제 실패
    Payment Service ->> Payment Repository: 결제 정보 Rollback
    Payment Service -->> User: 결제 실패에 대한 응답
  end
  Payment Repository -->>- Payment Service: 결제 정보 반환
  Payment Service ->>+ Payment Repository: 상품 재고 차감
  Payment Service ->>+ Payment Repository: 상품 판매량 증가
  Payment Service ->>+ Payment Repository: 사용자 포인트 차감
  Payment Service ->>+ Payment Repository: 주문 내역 생성
  Payment Service -->>- User: 결제에 대한 응답
```

## ERD

```mermaid
erDiagram
"users" {
  id INT PK
  name VARCHAR(150) UK
  created_at TIMESTAMP(3) 
  updated_at TIMESTAMP(3)
  deleted_at TIMESTAMP(3) "nullable"
}

"points" {
  id INT PK
  user_id INT FK
  point INT
  updated_at TIMESTAMP(3)
}

"point_histories" {
  id INT PK
  point_id INT FK
  point INT
  balance INT
  use_type VARCHAR(6)
  created_at TIMESTAMP(6)
}

"orders" {
  id INT PK
  user_id INT FK
  product_id INT FK
  product_name VARCHAR(150)
  count INT
  price INT
  created_at TIMESTAMP(6)
}

"stores" {
  id INT PK
  name VARCHAR(50) UK
  created_at TIMESTAMP(3)
  updated_at TIMESTAMP(3)
  deleted_at TIMESTAMP(3) "nullable"
}

"products" {
  id INT PK
  store_id INT FK
  name VARCHAR(200)
  price INT
  sales_volumn INT
  created_at TIMESTAMP(3)
  updated_at TIMESTAMP(3)
  deleted_at TIMESTAMP(3) "nullable"
}

"stock" {
  id INT PK
  product_id INT FK
  stock INT
  updated_at TIMESTAMP(3)
}

users ||--|| points: points
points ||--o{ point_histories: point_histories
users ||--o{ orders: orders
stores ||--o{ products: products
products ||--|| stock: stock
products ||--o{ orders: orders
```

### `users`
**Properties**
   - `id`: 사용자 고유 ID
   - `name`: 사용자 이름
   - `created_at`: 사용자 생성일
   - `updated_at`: 사용자 정보 수정일
   - `deleted_at`: 사용자 삭제일

### `points`
**Properties**
   - `id`: 포인트 고유 ID
   - `user_id`: 사용자 고유 ID
   - `point`: 사용자 포인트
   - `updated_at`: 포인트 수정일

### `point_histories`
**Properties**
  - `id`: 포인트 이력 고유 ID
  - `point_id`: 포인트 고유 ID
  - `point`: 포인트 변동량
  - `balance`: 포인트 잔액
  - `use_type`: 포인트 사용 타입
  - `created_at`: 포인트 이력 생성일

### `orders`
**Properties**
  - `id`: 주문 고유 ID
  - `user_id`: 사용자 고유 ID
  - `product_id`: 상품 고유 ID
  - `product_name`: 상품 이름
  - `count`: 상품 수량
  - `price`: 상품 가격
  - `created_at`: 주문 생성일

### `stores`
**Properties**
  - `id`: 상점 고유 ID
  - `name`: 상점 이름
  - `created_at`: 상점 생성일
  - `updated_at`: 상점 정보 수정일
  - `deleted_at`: 상점 삭제일

### `products`
**Properties**
  - `id`: 상품 고유 ID
  - `store_id`: 상점 고유 ID
  - `name`: 상품 이름
  - `price`: 상품 가격
  - `sales_volumn`: 상품 판매량
  - `created_at`: 상품 생성일
  - `updated_at`: 상품 정보 수정일
  - `deleted_at`: 상품 삭제일

### `stock`
**Properties**
  - `id`: 재고 고유 ID
  - `product_id`: 상품 고유 ID
  - `stock`: 상품 재고
  - `updated_at`: 재고 수정일

## API

## Transaction

## Indexing

## Caching Strategy

## Kafka


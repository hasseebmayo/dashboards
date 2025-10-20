---
applyTo: "app/**/*.tsx"
---

## How to manage server side fetching
I will provide you with openapi schema or response type with endpoints. You need to create keys inside of **lib/query** will follow the following instruction how to create keys.

## ApplyTo
This instruction applies to:
- Creating new query key files in `lib/query/` folder
- Managing API endpoints and data fetching
- Setting up typed query hooks
- Integration with React Query/TanStack Query

## Creating Keys
First identify the main key export if it matches with any key which have you have to read the files inside of the **lib/query** folder.
### Types
All the types of query which are you creating will added inside of the **types** folder.
Check if the types are already defined as the types will be reused again and again.


### Basic Example
```tsx
import { defineQuery } from "@/lib/query/query.utils"
import type { Post } from "@/types"

type FirstResponseType = {
  haseeb: string
}

export const SAMPLE_KEYS = {
  first: defineQuery<
    { haseeb: string }[],
    { string: string },
    { searchParams: string }
  >({
    queryKey: ["first"],
    path: "/api/first",
    requiresParams: true,
    _data: [] as FirstResponseType[], // This helps with type inference
  }),
  all: defineQuery<object, { id: number }>({
    queryKey: ["all"],
    path: "posts",
    requiresParams: true,
    _data: [] as Post[], // This helps with type inference
  }),
}
```

## How to create keys using query.utils

1. **Use `defineQuery`** to define each query key. It supports both static and dynamic queries with generics for response type, params, and search params.

2. **Query Types:**
   - `StaticQuery`: For queries with fixed keys and paths
   - `DynamicQuery`: For queries where keys or paths depend on params
   - `QueryDefinition`: Combines both static and dynamic queries

3. **Type Inference:** Use `_data`, `_params`, and `_searchParams` for better type inference and autocomplete.

4. **Advanced Example:**
   ```tsx
   import { defineQuery } from "@/lib/query/query.utils"

   export const USER_KEYS = {
     // Static query
     list: defineQuery<User[], undefined, { page?: number; limit?: number }>({
       queryKey: ["users"],
       path: "/api/users",
       _data: [] as User[],
     }),

     // Dynamic query with params
     get: defineQuery<User, { id: string }>({
       queryKey: ["user"],
       path: "/api/user/:id", // :id will be replaced with actual param
       requiresParams: true,
       _data: {} as User,
     }),

     // Query with search params
     search: defineQuery<User[], undefined, { query: string; status?: string }>({
       queryKey: ["users", "search"],
       path: "/api/users/search",
       requiresParams: false,
       _data: [] as User[],
     }),
   }
   ```

## Available Methods from query.utils

- **`defineQuery`**: Create a query definition with full typing support
- **`createTypedFetchHook`**: Generates a typed fetch hook for all your query keys. Use this to get `useTypedFetch` for fetching data
- **`createTypedQueryClientHook`**: Generates a typed query client hook for cache manipulation (`setQueryData`, `getQueryData`, `invalidateQuery`, `removeQuery`, etc.)
- **`extractQueryKeys`**: Utility to extract and merge query keys for use in hooks or clients
- **Type helpers**: `InferQueryData`, `InferQueryParams`, `InferSearchParams` for type inference

## Integration: Add new keys to index.ts

When you create a new query key file (e.g., `user.keys.ts`), you must import and add it to the main export in `lib/query/index.ts`:

```tsx
import { USER_KEYS } from "./user.keys"
import { POST_KEYS } from "./post.keys"
// ...other imports

export const QUERY_KEYS = {
  user: USER_KEYS,
  post: POST_KEYS,
  // ...other keys
}

// Export typed hooks
export const { useTypedFetch } = createTypedFetchHook(QUERY_KEYS)
export const { useTypedQueryClient } = createTypedQueryClientHook(QUERY_KEYS)
```

This enables:
- Autocomplete and typed access for all queries
- Type-safe parameter passing
- Proper cache key generation
- Intellisense support in your components


## Integrating This Keys
You will use this component named **Fetcher** from **components/fetcher.tsx**. This component will help you fetch data using the defined query keys.

**IMPORTANT: Use the Fetcher component for ALL data fetching operations. Do not use useQuery, useTypedFetch, or other hooks directly.**

## API Response Structure
All API responses follow this standard structure:
```json
{
  "message": "Success message",
  "data": {
    // Your actual data here
  }
}
```

**IMPORTANT NOTES:**
- The Fetcher component automatically extracts the `data` property from the API response
- In your `onSuccess` callback, you receive the `data` directly, NOT the full response object
- You don't need to type the response parameter in `onSuccess` - the Fetcher component auto-attaches the correct types based on your query definition
- The `message` field is handled internally by the Fetcher component

### Basic Usage
```tsx
<Fetcher
  query={{
    module: "dashboard", // Module name from your query keys (dashboard, organization, subscription, etc.)
    key: "stats" // Key name within the module
  }}
  onSuccess={(data) => {
    // `data` is automatically extracted from response.data
    // No need to access response.data - just use `data` directly
    // Type is automatically inferred from your query definition
    return <YourDataComponent data={data} />
  }}
  onLoading={() => <LoadingSpinner />}
  onError={() => <ErrorMessage />}
  onEmpty={() => <EmptyState />}
/>
```

### Advanced Usage with Parameters
```tsx
<Fetcher
  query={{
    module: "organization",
    key: "details"
  }}
  params={{ organizationId: "123" }} // For dynamic paths like /api/org/:organizationId
  searchParams={{ include: "members" }} // For query parameters like ?include=members
  options={{
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: shouldFetch // Conditional fetching
  }}
  onSuccess={(organizationData) => (
    // organizationData is the extracted data, fully typed
    <OrganizationDetails data={organizationData} />
  )}
  onLoading={() => <Skeleton className="h-32 w-full" />}
  onError={(error, refetch) => (
    <ErrorCard error={error} onRetry={refetch} />
  )}
/>
```

### Example: Handling Paginated Data
If your API returns:
```json
{
  "message": "Successfully fetched organizations list",
  "data": {
    "organizations": [...],
    "pagination": {...}
  }
}
```

Your component would access it like:
```tsx
<Fetcher
  query={{ module: "admin", key: "orgList" }}
  onSuccess={(data) => (
    // data = { organizations: [...], pagination: {...} }
    <Table>
      <TableBody>
        {data.organizations.map((org) => (
          <TableRow key={org.id}>...</TableRow>
        ))}
      </TableBody>
    </Table>
  )}
/>
```

### Alternative: Unified Loading State
```tsx
<Fetcher
  query={{ module: "dashboard", key: "stats" }}
  onWithLoadingState={(data, isLoading) => {
    if (isLoading) return <LoadingComponent />
    return <StatsDisplay data={data} />
  }}
  onError={(error) => <ErrorDisplay error={error} />}
/>
```

### For Mutations (POST/PUT/DELETE)
Use the exported mutation hooks instead of the Fetcher component:
```tsx
import { useCreateSubscription, useCancelSubscription } from "@/lib/query"

function SubscriptionButton() {
  const createMutation = useCreateSubscription({
    onSuccess: () => toast.success("Subscription created!"),
    onError: (error) => toast.error(error.message)
  })

  return (
    <Button
      onClick={() => createMutation.mutate({ planId: "pro" })}
      disabled={createMutation.isPending}
    >
      {createMutation.isPending ? "Creating..." : "Subscribe"}
    </Button>
  )
}
```

### Migration from useTypedFetch/useQuery
❌ **OLD** (Don't use):
```tsx
const { data, isLoading, error } = useTypedFetch({
  query: { module: "dashboard", key: "stats" }
})

if (isLoading) return <Loading />
if (error) return <Error />
return <Component data={data} />
```

✅ **NEW** (Use this):
```tsx
<Fetcher
  query={{ module: "dashboard", key: "stats" }}
  onSuccess={(data) => <Component data={data} />}
  onLoading={() => <Loading />}
  onError={() => <Error />}
/>
```

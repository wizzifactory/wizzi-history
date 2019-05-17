import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
var httpLink = createHttpLink({
    uri: 'https://ojo6385vn6.sse.codesandbox.io',
    fetchOptions: {
        mode: 'no-cors',
    },
});
var client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});
export default client;
//# sourceMappingURL=apollo.js.map
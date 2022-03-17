## Expx charts demo

### To run

```bash
yarn install
yarn dev
# or
npm equivalent
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Suggested Api Improvements

- Include icon uris for each protocol, I've added some myself and it's fun to look at.
- Would be nice to have some data to help scaling the charts i.e. min and max values for the apy series, or maybe something approximating a viewbox, (probably included with a special query param). Then you could dynamically size charts based on the data provided. You can calculate it on the client too but it's not ideal.

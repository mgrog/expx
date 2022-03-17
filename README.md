## Expx charts demo

### To run

```bash
yarn install
yarn dev
# or
npm equivalent
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sign in with "username": "user@expx.fi", "password": "Br98PKe\*js76QaF@1OdX"

## Suggested Api Improvements

- Include icon uris for each protocol, I've added some myself and it's fun to look at.
- Would be nice to have some data to help scaling the charts i.e. min and max values for the apy series, or maybe something approximating a viewbox, (probably included with a special query param). Then you could dynamically size charts based on the data provided. You can calculate it on the client too but it's not ideal.

## Things to try

- Responsive mode
- Changing pools with the arrows

### Notes

- The authentication is a little faked, but I felt it was outside the scope to have a fully working jwt authentication just for a demo. It uses _a_ cookie at least.
- I'm using React 18 RC, hopefully nothing blows up but contact me if something isn't working on your end.
- I added a few random datasets, I'm not fully sure if they make real world sense but they exist as a demonstration of UX possibilities.
- Forgive me if my defi terminology is a little off.

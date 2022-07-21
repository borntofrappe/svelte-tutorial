# [Strongman](https://svelte.dev/repl/c234f8c4626440179c710f0c65cabfca)

Strongman, or high striker, is a carnival game in which a mallet is used to test the force through a tower, and usually a bell. The design of this particular tower is inspired by [this design](https://dribbble.com/shots/2647080-Body-Temperature-Huffington-Post-Spot-Illustrations) and re-created through SVG syntax. You can find the concept in the `res` folder.

## How to Run

```bash
npm install
npm run dev
```

## Notes

Notice how the graphic is included in a button. The idea is to have svelte manage the duration of the button press and have the graphics react instantaneously. As the button is then released, the idea is to have svelte animate the mallet, puck and tower to match.

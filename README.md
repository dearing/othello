# Othello

Simple Othello SPA with terraform as a demonstration and sample.

## overview

The project calls for a SPA application that play Othello in the browser. However the over time it could expand into hosting state within a backend as a game manager, have differing sized Othello boards or even AI of various ratings play against a player in time.

## developer notes

For this to work, I decided to start the project as a monorepo of sorts using NX for management. From here we start with a single package on the root called `state` (poorly named) to handle the game logic like setting up a board and counting capturing moves. From there we add a react web project that consumes this library directly, as for now it needs to run without a backend. This allows us to use the type definitions of our `Othello` class for future backend work and cleanly offload logic from the SPA unto any future projects. From there it is a matter of decorating the components for style and taste.

## deployment

In the `terraform` directory, HCL is defined to deploy a cloudfront website with s3 as the origin. The contents of `dist/web` are then uploaded and *only* cloudfront is allowed to access those objects. Any future with backends could be served up most simply with container(s) for the backend and optionally frontend as well.

## future improvements

### frontend: difficulty

The library itself knows the status of the game by pre-validating and counting captures. This is used as an UI hint for 'clickable' disks for the user, this function could easily be disabled at the UI as a form of hint-mode toggle for difficulty sliders. Outside of also resizing the board - the game rules can't really be helped along much else for the user.

edit: it occurs to me that improving the UI to also show the value of a capture (in flips) could be helpful but the nature of Othello isn't always about scoring the most for a given round...

### backend: history

One could expand on the state of the board (plus player turn) as building array for history and game replays, this would need to be offloaded unto a database of some sort and that itself would then need to be keyed to be 'found' for the clients. Then a UX slider could be implemented or a hash that defines the game board size and move history as a url link.

### backend: computer opponents

Another fun use case for enhancement would be to implement an AI to play against the player. The classic way would be to spend compute effort building a tree of potential moves and evaluating the overall score and going with that. Difficulty on the computer opponent could then be adjusted by the breadth and depth of futures the opponent could work within.  Another idea is pre-baking models trained against themselves for various times and given ratings (ELO?) that could then be given personalities like "Iago" and "Cassio".

## a note on AI

I used AI to doodle up the HTML (react components) mostly in the project along with some boilerplate here and there. The idea of using an array of directions for computing the capture search algo was inspired by me asking claude about overlaying a mask of valid moves. I was defaulting to using a long search list where it gave a 2d array to iterate over instead, much more elegant. I would think I would of eventually cleaned it up after the fact but we'll never know now.

## TODO

There are `git grep TODO | wc -l` seven TODO and much more places to refactor, cleanup and smooth over the code but since this is meant to be homework and not a published app, I'm holding off to allow for talking points on thought process, pain points and improvements.

Jacob Dearing
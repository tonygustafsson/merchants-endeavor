# Merchant's Endeavor

This is a very simple game with some potential for the future. It's built on [SvelteKit](https://kit.svelte.dev/) and is using LocalForage as a database.

## Time and weather

The time is flowing every second in the game, but you can pause it or make the time go faster. It's a relaxed game so you don't have to do things quickly, but some things takes time. Like hiring new staff or sending a ship out on a mission. The time starts at Janary 1st 1660.

There are also a weather system, which changes, um, nothing yet. But it might rain on you. It might not.

## Starting out

When starting out in the game you will be able to select your name, gender, nationality and home town.

![Start](/static/img/readme/start.png 'Starting out')

## Properties

### Ships

You can own one or many ships. They can be of types:

- Brig
- Merchantman
- Galleon
- Frigate

They have all different properties, like maximum load, maximum crew members and such.

You can control how many crew members and cannons each ship has, and when you feel good about it, you send it out on a mission. When it comes back it will hopefully bring back some doubloons and goods. It might have been damaged on the seas and in need of a repair though.

### Businesses

You can also own businesses and make money as a passive income. The amount of money you will earn depends on the number of staff members and business type. There are:

- Merchants
- Blacksmiths
- Taverns
- Brothels

For each business you own, you can controll the number of staff members.

### Loans

You can take out loans, but they needs to be payed back with interest.

![Properties](/static/img/readme/properties.png 'Properties')

## Staff

Your staff can either be set to work in your businesses or as crew members of any of your ships. These properties cannot work without staff.

The staff needs to be taken care of though - they need their health and a good mood, without it they might leave.

You can hire new staff or fire them. You can also pay to restore their mood and health.

![Staff](/static/img/readme/staff.png 'Staff')

## Goods

You can carry Cannons, food, water, spices, porcelain, tobacco and rum. They are all worth different amounts, and you can sell or buy them freely. You might also get some after your ships missions.

![Goods](/static/img/readme/goods.png 'Goods')

## Logs

All events in the game are saved in your log book for you to keep track of. Both the real time and the game time.

![Logs](/static/img/readme/logs.png 'Logs')

## Demo

[https://merchants-endeavor.vercel.app/](https://merchants-endeavor.vercel.app/)

<script>
    import { ships } from '../../stores/ships.js';
    import { merchant } from '../../stores/merchant.js';
    import { goods } from '../../stores/goods.js';
    import { shipTypes } from '../../utils/ship';
    import { staff } from '../../stores/staff.js';
    import { game } from '../../stores/game';
    import { log } from '../../stores/log';
    import Button from '../../components/Button.svelte';
    import TextInput from '../../components/TextInput.svelte';

    export let ship;

    const sellShip = ship => {
        // Return ship crew members
        staff.add(ship.crewMembers);

        // Return ship goods
        goods.add('cannons', ship.cannons);
        goods.add('food', ship.food);
        goods.add('water', ship.water);

        // Sell ship
        const worth = shipTypes[ship.type].price;
        ships.removeShip(ship.id);
        merchant.addDoubloons(worth);
        log.add(`You sold your ${ship.type} ${ship.name} for ${worth} dbl.`);

        // Go back to Property page
        game.changeRoute('properties');
    };

    const renameShip = (ship, newName) => {
        ships.setName(ship.id, newName);
        log.add(`You renamed your ${ship.type} from ${ship.name} to ${newName}.`);
    };
</script>

<div class="component-shipactions">
    <h3>Actions</h3>

    <div>
        <TextInput
            label="Ship name"
            name="ship-name"
            value={ship.name}
            on:change={e => renameShip(ship, e.target.value)} />
        <Button>📛 Change name</Button>

        <Button on:click={() => sellShip(ship)}>💰 Sell the ship</Button>
    </div>
</div>

<script>
    import { time } from '../stores/time.js';
    import { merchant } from '../stores/merchant';
    import { ships, shipTotals } from '../stores/ships.js';
    import { businessTotals } from '../stores/businesses.js';
    import { staff } from '../stores/staff';
    import { goods } from '../stores/goods';
    import { game } from '../stores/game';
    import { nationalities } from '../constants/game';
    import Table from '../components/Table.svelte';
    import { ucFirst } from '../utils/string';

    let noOfShips = 0;

    ships.subscribe(value => {
        noOfShips = value.length;
    });
</script>

<style>
    tr {
        cursor: pointer;
    }

    tr:hover td {
        text-decoration: underline;
    }

    td {
        filter: grayscale(0.5);
    }
</style>

<div class="page-stats">
    <h3>{$merchant.name}</h3>

    {#if $merchant.nationality}
        <p>
            {nationalities[$merchant.nationality].flag} You are trying to tame the carribean as a {$merchant.gender}
            from {ucFirst($merchant.nationality)}. You started out {$time.sinceStart} in {$merchant.town}.
        </p>
    {/if}

    <h3>Inventory</h3>

    <Table>
        <tr>
            <th>Item</th>
            <th>Value</th>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>💰 Doubloons</td>
            <td>{$merchant.doubloons} dbl</td>
        </tr>
        <tr on:click={() => game.changeRoute('properties')}>
            <td>⛵ Ships</td>
            <td>{noOfShips} ships</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>💣 Cannons</td>
            <td>{$shipTotals.cannons + $goods.cannons} pcs</td>
        </tr>
        <tr on:click={() => game.changeRoute('staff')}>
            <td>👫 Staff</td>
            <td>{$shipTotals.crewMembers + $businessTotals.staff + $staff.members} members</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>🍲 Food</td>
            <td>{$goods.food} cartons</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>🥛 Water</td>
            <td>{$goods.water} barrels</td>
        </tr>
    </Table>
</div>

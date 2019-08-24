<script>
    import { time } from '../stores/time.js';
    import { merchant } from '../stores/merchant';
    import { ships, shipTotals } from '../stores/ships.js';
    import { staff } from '../stores/staff';
    import { goods } from '../stores/goods';
    import { game } from '../stores/game';
    import { ucFirst } from '../utils/string';
    import Table from '../components/Table.svelte';

    let noOfShips = 0;
    let noOfStaff = 0;

    staff.subscribe(value => {
        noOfStaff = value.members;
    });

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
</style>

<div class="page-stats">
    <h3>{$merchant.name}</h3>

    <p>
        {#if $merchant.nationality === 'english'}
            🇬🇧
        {:else if $merchant.nationality === 'french'}
            🇫🇷
        {:else if $merchant.nationality === 'spanish'}🇪🇸{:else if $merchant.nationality === 'dutch'}🇧🇶{/if}
        You are trying to tame the carribean as a {ucFirst($merchant.nationality)} {$merchant.gender}. You started out {$time.sinceStart}.
    </p>

    <h3>Inventory</h3>

    <Table>
        <tr>
            <th>Item</th>
            <th>Value</th>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>Doubloons</td>
            <td>{$merchant.doubloons} dbl</td>
        </tr>
        <tr on:click={() => game.changeRoute('properties')}>
            <td>Ships</td>
            <td>{noOfShips} ships</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>Cannons</td>
            <td>{$shipTotals.cannons + $goods.cannons} pcs</td>
        </tr>
        <tr on:click={() => game.changeRoute('staff')}>
            <td>Staff</td>
            <td>{$shipTotals.crewMembers + noOfStaff} members</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>Food</td>
            <td>{$shipTotals.food + $goods.food} cartons</td>
        </tr>
        <tr on:click={() => game.changeRoute('goods')}>
            <td>Water</td>
            <td>{$shipTotals.water + $goods.water} barrels</td>
        </tr>
    </Table>
</div>

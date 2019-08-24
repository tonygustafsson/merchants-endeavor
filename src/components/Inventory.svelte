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
        <tr>
            <td>Doubloons</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>{$merchant.doubloons} dbl</a>
            </td>
        </tr>
        <tr>
            <td>Ships</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('properties')}>{noOfShips} ships</a>
            </td>
        </tr>
        <tr>
            <td>Cannons</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>
                    {$shipTotals.cannons + $goods.cannons} pcs
                </a>
            </td>
        </tr>
        <tr>
            <td>Staff</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('staff')}>
                    {$shipTotals.crewMembers + noOfStaff} members
                </a>
            </td>
        </tr>
        <tr>
            <td>Food</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>
                    {$shipTotals.food + $goods.food} cartons
                </a>
            </td>
        </tr>
        <tr>
            <td>Water</td>
            <td>
                <a href="/goods" on:click|preventDefault={() => game.changeRoute('goods')}>
                    {$shipTotals.water + $goods.water} barrels
                </a>
            </td>
        </tr>
    </Table>
</div>

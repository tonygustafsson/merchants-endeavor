<script>
    import { shipTypes } from '../../utils/ship';
    import { ucFirst } from '../../utils/string';
    import Table from '../../components/Table.svelte';

    export let ship;

    $: currentLoad = ship ? ship.food + ship.water : 0;
</script>

<style>
    td {
        filter: grayscale(0.5);
    }
</style>

<div class="component-shipinfo">
    <Table>
        <tr>
            <th>Quality</th>
            <th>Value</th>
        </tr>
        <tr>
            <td>⛵ Type</td>
            <td>{ucFirst(ship.type)}</td>
        </tr>
        <tr>
            <td>👫 Crew members</td>
            <td>{ship.crewMembers} (Min: {shipTypes[ship.type].crewMin} Max: {shipTypes[ship.type].crewMax})</td>
        </tr>
        <tr>
            <td>💣 Cannons</td>
            <td>{ship.cannons} / {shipTypes[ship.type].cannonsMax}</td>
        </tr>
        <tr>
            <td>🍲 Food</td>
            <td>{ship.food} cartons</td>
        </tr>
        <tr>
            <td>🥛 Water</td>
            <td>{ship.water} barrels</td>
        </tr>
        <tr>
            <td>💚 Health</td>
            <td>{ship.health}%</td>
        </tr>
        <tr>
            <td>⚖ Load</td>
            <td>{currentLoad} / {shipTypes[ship.type].loadCapacity}</td>
        </tr>
    </Table>
</div>

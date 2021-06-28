<script>
    import { types } from '../../constants/ships';
    import { ucFirst } from '../../utils/string';
    import Table from '../../components/Table.svelte';

    export let ship;
</script>

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
            <td>{ship.crewMembers} / {types[ship.type].crewMax}</td>
        </tr>
        <tr>
            <td>💣 Cannons</td>
            <td>{ship.cannons} / {types[ship.type].cannonsMax}</td>
        </tr>
        <tr>
            <td>💚 Health</td>
            <td>{ship.health}%</td>
        </tr>
    </Table>
</div>

<style>
    td {
        filter: grayscale(0.5);
    }
</style>

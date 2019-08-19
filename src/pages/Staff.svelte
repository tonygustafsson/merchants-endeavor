<script>
    import { staff } from '../stores/staff.js';
    import { goods } from '../stores/goods.js';
    import { shipTotals } from '../stores/ships.js';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';
</script>

<div class="page-staff">
    <h2>Staff</h2>

    <p>
        You need staff to be able to populate ship crew and give them tasks. It's important to keep your staff healthy
        and happy.
    </p>

    <Table>
        <tr>
            <th>Item</th>
            <th>Quantity</th>
        </tr>
        <tr>
            <td>Staff total</td>
            <td>{$staff.members + $shipTotals.crewMembers}</td>
        </tr>
        <tr>
            <td>Staff on board ships</td>
            <td>{$shipTotals.crewMembers}</td>
        </tr>
        <tr>
            <td>Health</td>
            <td>{$staff.health}%</td>
        </tr>
        <tr>
            <td>Mood</td>
            <td>{$staff.mood}%</td>
        </tr>
    </Table>

    <div>
        <Button on:click={() => staff.add(1)}>Add staff</Button>
        <Button on:click={() => staff.remove(1)}>Fire staff</Button>
    </div>
</div>

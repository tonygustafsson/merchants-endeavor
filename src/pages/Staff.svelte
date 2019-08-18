<script>
    import { staff } from '../stores/staff.js';
    import { goods } from '../stores/goods.js';
    import { shipTotals } from '../stores/ships.js';
</script>

<div class="page-staff">
    <h2>Staff</h2>

    <p>
        You need staff to be able to populate ship crew and give them tasks. It's important to keep your staff healthy
        and happy.
    </p>

    <table>
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
    </table>

    <div>
        <button on:click={() => staff.add(1)}>Add staff</button>
        <button on:click={() => staff.remove(1)}>Fire staff</button>
    </div>
</div>

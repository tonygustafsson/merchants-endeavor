<script>
    import { merchant } from '../stores/merchant.js';
    import { staff } from '../stores/staff.js';
    import { goods } from '../stores/goods.js';
    import { shipTotals } from '../stores/ships.js';
    import { log } from '../stores/log';
    import { notifications } from '../stores/notifications';
    import Table from '../components/Table.svelte';
    import Button from '../components/Button.svelte';

    $: restoreMoodCost = ($staff.members + $shipTotals.crewMembers) * ((100 - $staff.mood) * 3);
    $: restoreMoodAvailable = $staff.mood < 100 && $merchant.doubloons >= restoreMoodCost;

    const restoreMood = () => {
        merchant.subtractDoubloons(restoreMoodCost);
        staff.restoreMood();
        log.add(`You restored your crews mood by giving them ${restoreMoodCost} dbl of your funds.`);
    };

    $: restoreHealthCost = ($staff.members + $shipTotals.crewMembers) * ((100 - $staff.health) * 3);
    $: restoreHealthAvailable = $staff.health < 100 && $merchant.doubloons >= restoreHealthCost;

    const restoreHealth = () => {
        merchant.subtractDoubloons(restoreHealthCost);
        staff.restoreHealth();
        log.add(`You restored your crews health for ${restoreHealthCost} dbl.`);
    };

    const requireHireStaff = () => {
        staff.requestHire();
        log.add(`You requested to hire more staff members.`);
    };

    const fireStaffMember = () => {
        staff.remove(1);
        log.add(`You fired a staff member.`);
    };
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
            <td>👫 Staff (unoccupied)</td>
            <td>{$staff.members}</td>
        </tr>
        <tr>
            <td>⛵ Staff on board ships</td>
            <td>{$shipTotals.crewMembers}</td>
        </tr>
        <tr>
            <td>🖤 Health</td>
            <td>{$staff.health}%</td>
        </tr>
        <tr>
            <td>😄 Mood</td>
            <td>{$staff.mood}%</td>
        </tr>
    </Table>

    <div>
        <Button disabled={$staff.hireRequestActive} on:click={requireHireStaff}>👫 Hire staff</Button>
        <Button disabled={$staff.members <= 0} on:click={fireStaffMember}>👫 Fire staff</Button>
        <Button on:click={restoreMood} disabled={!restoreMoodAvailable}>😃 Restore mood ({restoreMoodCost} dbl)</Button>
        <Button on:click={restoreHealth} disabled={!restoreHealthAvailable}>
            😷 Restore health ({restoreHealthCost} dbl)
        </Button>
    </div>
</div>

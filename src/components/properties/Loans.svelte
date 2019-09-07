<script>
    import { ticker } from '../../stores/ticker.js';
    import { time } from '../../stores/time.js';
    import { merchant } from '../../stores/merchant.js';

    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';

    const maxLoan = 10000;

    $: getLoanInterest = (sum, tick) => {
        const ticksSinceLoan = $ticker - tick;
        return Math.floor(sum * (ticksSinceLoan * 0.00005));
    };

    $: loanAvailable = () => {
        if (!$merchant.loans) return false;

        const totalLoan = $merchant.loans.reduce((acc, currentValue) => {
            acc += currentValue.sum;
            return acc;
        }, 0);

        return totalLoan < maxLoan;
    };

    const takeLoan = () => {
        merchant.takeLoan(1000);
    };
</script>

<h3>Loans</h3>

<p>
    You can take loans to be able to make purchases and investments, they will need to be payed back though. With
    interest.
</p>

{#if $merchant.loans && $merchant.loans.length > 0}
    <Table>
        <tr>
            <th>Time</th>
            <th>Amount</th>
            <th>Repay</th>
        </tr>
        {#each $merchant.loans as loan}
            <tr>
                <td>{$time.getTimeAtTick(loan.tick)}</td>
                <td>{loan.sum}</td>
                <td>
                    <Button variant="small">Repay for {loan.sum + getLoanInterest(loan.sum, loan.tick)} dbl</Button>
                </td>
            </tr>
        {/each}
    </Table>
{:else}
    <p>
        <em>No loans yet.</em>
    </p>
{/if}

{#if !loanAvailable()}
    <p>
        <em>You cannot take any more loans since you reached the limit of {maxLoan} dbl.</em>
    </p>
{/if}

<Button disabled={!loanAvailable()} on:click={takeLoan}>Take loan</Button>

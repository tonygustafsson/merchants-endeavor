<script>
    import { ticker } from '../../stores/ticker.js';
    import { time } from '../../stores/time.js';
    import { merchant } from '../../stores/merchant.js';
    import { log } from '../../stores/log.js';

    import Table from '../../components/Table.svelte';
    import Button from '../../components/Button.svelte';

    const maxLoan = 10000;

    $: getLoanInterest = (sum, tick) => {
        const ticksSinceLoan = $ticker - tick;
        return Math.floor(sum * (ticksSinceLoan * 0.00005));
    };

    $: loanAvailable = loanSum => {
        if (!$merchant.loans) return false;

        const totalLoan = $merchant.loans.reduce((acc, currentValue) => {
            acc += currentValue.sum;
            return acc;
        }, 0);

        return loanSum + totalLoan <= maxLoan;
    };

    const takeLoan = loanSum => {
        merchant.takeLoan(loanSum);
        log.add(`You took a new loan of ${loanSum} dbl.`);
    };

    const repayLoan = loanId => {
        merchant.repayLoan(loanId);
        log.add(`You repaid your loan.`);
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
                <td>{loan.sum} dbl</td>
                <td>
                    <Button
                        on:click={() => repayLoan(loan.id)}
                        disabled={$merchant.doubloons < loan.sum + getLoanInterest(loan.sum, loan.tick)}
                        variant="small"
                    >
                        Repay for {loan.sum + getLoanInterest(loan.sum, loan.tick)} dbl
                    </Button>
                </td>
            </tr>
        {/each}
    </Table>
{:else}
    <p>
        <em>No loans yet.</em>
    </p>
{/if}

{#if !loanAvailable(1000)}
    <p>
        <em>You cannot take any more loans since you reached the limit of {maxLoan} dbl.</em>
    </p>
{/if}

<Button disabled={!loanAvailable(1000)} on:click={() => takeLoan(1000)}>💰 Loan 1000 dbl</Button>
<Button disabled={!loanAvailable(2500)} on:click={() => takeLoan(2500)}>💰 Loan 2500 dbl</Button>
<Button disabled={!loanAvailable(5000)} on:click={() => takeLoan(5000)}>💰 Loan 5000 dbl</Button>

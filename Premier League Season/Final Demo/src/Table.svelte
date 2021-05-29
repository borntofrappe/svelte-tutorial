<script>
  export let data;

  const keys = [
    { label: 'Pos', title: 'Position' },
    { label: 'Team' },
    { label: 'W', title: 'Won' },
    { label: 'D', title: 'Drawn' },
    { label: 'L', title: 'Lost' },
    [
      { label: 'GF', title: 'Goals for' },
      { label: 'GA', title: 'Goals against' },
    ],
    { label: 'Pts', title: 'Points' },
  ];
</script>

<table>
  <thead>
    <tr>
      {#each keys as key}
        {#if Array.isArray(key)}
          {#each key as k}
            <th>
              {#if k.title}
                <abbr title={k.title}>{k.label}</abbr>
              {:else}
                {k.label}
              {/if}
            </th>
          {/each}
        {:else}
          <th>
            {#if key.title}
              <abbr title={key.title}>{key.label}</abbr>
            {:else}
              {key.label}
            {/if}
          </th>
        {/if}
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as { team, won, drawn, lost, goals, points }, i}
      <tr>
        {#each [i + 1, team, won, drawn, lost, goals[0], goals[1], points] as d}
          <td>{d}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    width: 100%;
    position: relative;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.35rem 0.25rem;
    text-align: center;
  }

  td:nth-of-type(2) {
    text-align: initial;
  }

  thead th {
    color: hsl(0, 0%, 98%);
    background: hsl(0, 0%, 20%);
    font-weight: initial;
    position: sticky;
    top: 0;
  }

  tbody tr:nth-of-type(even) {
    background: hsl(0, 0%, 97%);
  }

  abbr {
    text-decoration: none;
    border-bottom: 1px dotted currentColor;
  }
</style>

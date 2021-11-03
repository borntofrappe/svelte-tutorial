<script>
  // https://www.lemonde.fr/les-decodeurs/article/2018/08/02/manger-du-reblochon-l-ete-du-mont-d-or-l-hiver-quelle-saisonnalite-pour-les-fromages_5338688_4355770.html
  import data from "./data.js";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let selectedMonth = months[new Date().getMonth()];
  $: selectedMonthIndex = months.findIndex((month) => month === selectedMonth);
  $: selectedMonthCheeses = data
    .filter(({ beginning, end }) => {
      if (beginning < end)
        return (
          selectedMonthIndex >= beginning - 1 && selectedMonthIndex <= end - 1
        );
      else
        return (
          selectedMonthIndex <= beginning - 1 || selectedMonthIndex >= end - 1
        );
    })
    .sort(() => 0.5 - Math.random()) // rudimentary shuffle
    .slice(0, 10);
</script>

<p>
  The following list highglights some of the cheeses best sampled in
  <select bind:value={selectedMonth}>
    {#each months as month}
      <option>{month}</option>
    {/each}
  </select>
  :
</p>

<ul>
  {#each selectedMonthCheeses as { name }}
    <li>
      <button>
        {name}
      </button>
    </li>
  {/each}
</ul>

<style>
  select {
    background: none;
    display: inline;
    border: none;
    border-bottom: 1px solid currentColor;
    font-weight: 700;
  }

  ul {
    padding: 0;
  }

  ul li {
    display: inline;
  }

  ul li:not(:last-of-type)::after {
    content: ", ";
  }

  button {
    font-weight: 700;
    background: none;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    position: relative;
    cursor: pointer;
    z-index: 0;
  }

  button::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hsl(135, 80%, 40%);
    opacity: 0.15;
    transform: scaleY(0.1);
    transform-origin: 50% 100%;
    transition: transform 0.25s ease-in-out;
    z-index: -5;
  }

  button:hover::after {
    transform: scaleY(1);
  }
</style>

export const filterByData = `
  <section>
    <h3>Фильтры по значению</h3>
    <fieldset>
      <legend>Производитель</legend>
      <label>
        <input name="manufacturer[]" type="checkbox" value="Samsung">
        Samsung
      </label>
      <label>
        <input name="manufacturer[]" type="checkbox" value="Apple">
        Apple
      </label>
      <label>
        <input name="manufacturer[]" type="checkbox" value="Xiaomi">
        Xiaomi
      </label>
    </fieldset>

    <fieldset>
      <legend>Количество камер</legend>
      <label>
        <input name="camera[]" type="checkbox" value="3">
        3
      </label>
      <label>
        <input name="camera[]" type="checkbox" value="2">
        2
      </label>
      <label>
        <input name="camera[]" type="checkbox" value="1">
        1
      </label>
    </fieldset>

    <fieldset>
      <legend>Цвет</legend>
      <label>
        <input name="color[]" type="checkbox" value="белый">
        Белый
      </label>
      <label>
        <input name="color[]" type="checkbox" value="желтый">
        Желтый
      </label>
      <label>
        <input name="color[]" type="checkbox" value="красный">
        Красный
      </label>
    </fieldset>

    <p>
      <label>
        <input name="popular-only" type="checkbox">
        Только популярные
      </label>
    </p>
  </section>
`;

export const filterByData = `
  <section>
    <h3 class="filter__section-heading">Фильтры по&nbsp;значению</h3>
    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>Производитель</legend>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="Samsung">
        <div class="checkbox-icon checkbox-icon--samsung"></div>
        Samsung
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="Apple">
        <div class="checkbox-icon checkbox-icon--apple"></div>
        Apple
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="manufacturer[]" type="checkbox" value="Xiaomi">
        <div class="checkbox-icon checkbox-icon--xiaomi"></div>
        Xiaomi
      </label>
    </fieldset>

    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>Цвет корпуса</legend>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="белый">
        <div class="checkbox-color checkbox-color--white"></div>
        Белый
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="желтый">
        <div class="checkbox-color checkbox-color--yellow"></div>
        Желтый
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="красный">
        <div class="checkbox-color checkbox-color--red"></div>
        Красный
      </label>
      <label class="filter__label filter__color-label">
        <input class="filter__custom-checkbox" name="color[]" type="checkbox" value="черный">
        <div class="checkbox-color checkbox-color--black"></div>
        Черный
      </label>
    </fieldset>

    <fieldset class="filter__fieldset filter__fieldset--flex">
      <legend>Количество камер</legend>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="3">
        <div class="checkbox-icon checkbox-icon--camera3"></div>
        3
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="2">
        <div class="checkbox-icon checkbox-icon--camera2"></div>
        2
      </label>
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="camera[]" type="checkbox" value="1">
        <div class="checkbox-icon checkbox-icon--camera1"></div>
        1
      </label>
    </fieldset>

    <div class="filter__select">
      <label class="filter__label">
        <input class="filter__custom-checkbox" name="popular-only" type="checkbox">
        <div class="checkbox-box"></div>
        Только популярные
      </label>
    </div>
  </section>
`;

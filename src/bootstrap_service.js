export function VratiInner(id,naziv){

    const htmlstring=`
    <p>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon3">${naziv}</span>
      </div>
      <input type="text" class="form-control" id="${id}" aria-describedby="basic-addon3">
    </div>
    </p>
    `;
    return htmlstring;
}
export function VratiInnerDva(id,naziv){

  const htmlstring=`
  <p>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="mycustom">${naziv}</span>
    </div>
    <input type="text" class="form-control" id="${id}" aria-describedby="basic-addon3">
  </div>
  </p>
  `;
  return htmlstring;
}
const mainEl = document.getElementById('main');
class Character {
  constructor(props) {
    this._name = props.name
    this._hp = props._hp
    this.initial_hp = props.initial_hp
    this._mp = props.mp
    this._initialMp = props.initialMp
    this._offensePower = props.offensePower
    this._defencePower = props.defencePower
  }

  showStatus() {
    /* 
      キャラクターの名前、_hp、MPを表示する。
    */
    mainEl.innerHTML += `
      <p>---------[ステータス]---------</p>
      <p>キャラクター名: ${this._name}</p>
      <p>体力: ${this._hp}</p>
      <p>魔法力: ${this._mp}</p>
    `
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
    
    mainEl.innerHTML += `
        <p>============================</p>
    `
    if (this._hp <= 0) {
      mainEl.innerHTML += `
        <p>${this._name}は_hp0以下のため攻撃できません</p>
      `
      return
    }
    const damage = this.calcAttackDamage(defender);
    if (defender._hp <= 0) {
      mainEl.innerHTML += `
        <p>${this._name}が${defender._name}に攻撃！</p>
        <p>${defender._name}は既に死んでいます</p>
      `
    } else {
      defender._hp = defender._hp - damage;
      mainEl.innerHTML += `
        <p>${this._name}が${defender._name}に攻撃！</p>
        <p>${defender._name}に${damage}のダメージ</p>
      `
      if (defender._hp <= 0) {
        mainEl.innerHTML += `
          <p>${defender._name}は死にました</p>
        `
      } else {
        mainEl.innerHTML += `
          <p>${defender._name}の残り_hp:${defender._hp}</p>
        `
      }
    }
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
    let damage =  this._offensePower - defender._defencePower;
    if (damage <= 0) {
      damage = 1;
    }
    return damage
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手の_hpを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    mainEl.innerHTML += `
      <p>============================</p>
    `
    if( this._hp <= 0 ){
      mainEl.innerHTML += `
        <p>${this.name}は死んでいます</p>
      `
      return
    }
    if( target._hp <= 0 ){
      mainEl.innerHTML += `
        <p>${target.name}は死んでいます</p>
        <p>回復できません</p>
      `
      return
    }
    if( this._mp <= 0 ){
      mainEl.innerHTML += `
        <p>MPが足りません</p>
      `
      return
    }
    this._mp -= 3;
    target._hp += 15;
    mainEl.innerHTML += `
      <p>${this._name}の回復魔法！</p>
      <p>${target._name}は_hpが15回復</p>
      <p>${target._name}の_hp:${target._hp}</p>
    `
  }

  fireSpell(target) {
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    mainEl.innerHTML += `
      <p>============================</p>
    `
    if (this._hp <= 0) {
      mainEl.innerHTML += `
        <p>${this.name}は死んでいます</p>
      `
      return
    }
    if (target._hp <= 0) {
      mainEl.innerHTML += `
        <p>${target.name}は死んでいます</p>
        <p>攻撃魔法できません</p>
      `
      return
    }
    if (this._mp <= 0) {
      mainEl.innerHTML += `
        <p>MPが足りません</p>
      `
      return
    }
    this._mp -= 2;
    target._hp -= 10;
    mainEl.innerHTML += `
      <p>${this._name}の攻撃魔法！</p>
      <p>${target._name}に10のダメージ</p>
      <p>${target._name}の_hp:${target._hp}</p>
    `
  }
}

{
  const fighter = new Character({
    name: '武道家',
    _hp: 10,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    _hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    _hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
  //console.log(monster._name)
}
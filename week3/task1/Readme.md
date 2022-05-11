### Задание: проаудировать смарт-контракт _VulnerableOne_

1. Не используется SafeMath для uint256, а значит нет защиты от переполнения и транзакция не будет отменена.
2. Контракт будет залочен, если created == 0, см. строчку 39 контракта — лучше использовать _bool_.
3. Получается, что функцию _set_super_user_ может вызвать кто угодно, а не только superuser.
4. Если добавить модификатор _onlySuperUser_ в функцию _set_super_user_ необходимо переписать конструктор на 
```
constructor() public {
    is_super_user[msg.sender] = true;
    add_new_user(msg.sender);
}
```
5. Функция **pay** и **add_new_user** c created bool будет выглядеть так:
```
function pay() public payable {
    require(users_map[msg.sender].created == true);
    users_map[msg.sender].ether_balance += msg.value;
}

function add_new_user(address _new_user) public onlySuperUser {
    require(users_map[_new_user].created == false);
    users_map[_new_user] = UserInfo({ created: true, ether_balance: 0 });
    users_list.push(_new_user);
}
```
6. Нет никакого описания функции **remove_user** в ТЗ. Сейчас все могут удалять пользователей. 
7. В функии **withdraw** возможен Cross-function Race Conditions баг. Функция **transfer** — это функция из другого контракта, есть вероятность, что баланс не обнулится. Необходимо сначала менять внутреннее состояние баланса, а потом вызывать функцию **transfer**.
8. В ТЗ нет ничего про функцию проверки баланса.


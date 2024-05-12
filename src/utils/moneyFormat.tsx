export default function moneyFormat(
    money: number | undefined
){
    let moneyStr = " ";
    if (money == undefined){
        return undefined
    }
    else {
        if (money > 999999999){
            money = money / 1000000000;
            moneyStr = money.toFixed(2)
            return moneyStr +  " MM $";

        }
        else if (money > 999999){
            money = money / 1000000;
            moneyStr = money.toFixed(2)
            return moneyStr +  " M $";

        }
        else if (money > 999) {
            money=money / 1000
            moneyStr = money.toFixed(2)
            return moneyStr +  " K $";
        }
        else {
            moneyStr = money.toFixed(2)
            return moneyStr + " $"
        }

    }
}



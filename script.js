function calculateLoan() {
    // 入力値の取得
    const price = parseFloat(document.getElementById('price').value) || 0;
    const downPayment = parseFloat(document.getElementById('down-payment').value) || 0;
    const months = parseInt(document.getElementById('months').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const bonusTimes = parseInt(document.getElementById('bonus-times').value);
    const bonusAmount = parseFloat(document.getElementById('bonus-amount').value) || 0;

    // バリデーション（不正な値のチェック）
    if (price <= 0 || months <= 0) {
        alert("車両価格と支払回数は正しく入力してください。");
        return;
    }
    if (downPayment >= price) {
        alert("頭金が車両価格を超えています。");
        return;
    }

    // 借入元金
    const principal = price - downPayment;
    
    // 金利計算のための月利
    const monthlyRate = rate / 100 / 12;

    let totalPayment = 0;

    // ローンの総支払額を計算（元利均等返済）
    if (rate > 0) {
        // 月々のベース支払額(ボーナス考慮前) = P * r(1+r)^n / ((1+r)^n - 1)
        const baseMonthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        totalPayment = baseMonthly * months;
    } else {
        totalPayment = principal;
    }

    // 増えた分（利息の総額）
    const totalInterest = totalPayment - principal;

    // ボーナスで支払う総額
    const years = Math.floor(months / 12); // 何年間ローンを払うか
    const totalBonusPayment = bonusAmount * years * bonusTimes;

    if (totalBonusPayment >= totalPayment) {
        alert("ボーナス払いの総額がローンの総額を上回っています。設定を見直してください。");
        return;
    }

    // ボーナス分を差し引いて、残りを月割り
    const monthlyPayment = (totalPayment - totalBonusPayment) / months;

    // 画面に表示（小数点第2位以下を四捨五入して表示）
    document.getElementById('res-monthly').innerText = monthlyPayment.toFixed(1);
    document.getElementById('res-interest').innerText = totalInterest.toFixed(1);

    // 結果エリアを表示する
    document.getElementById('result-section').classList.remove('hidden');
    
    // スクロールして結果を見やすくする
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
}

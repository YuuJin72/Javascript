//게임 실행 체크
var Playing_Status = false

//플레이어의 스코어
var Player1 = 0
var Player2 = 0
var Player3 = 0
var Player4 = 0
var Player1_Sub = 0
var Player2_Sub = 0
var Player3_Sub = 0
var Player4_Sub = 0
var P1Sub_count = 0
var P2Sub_count = 0
var P3Sub_count = 0
var P4Sub_count = 0
var Chksub1 = true
var Chksub2 = true
var Chksub3 = true
var Chksub4 = true
var Sub = 0



//족보확인 및 주사위그림 표현
var chk = [0, 0, 0, 0, 0]
var count = 0
var scount = 0
var DiceValue = []
var DiceSValue = []
var FourofKind = false
var FullHouse = false
var SStraight = false
var LStraight = false
var Yacht = false

//주사위 조작변수
var RemainDice = 3
var Remain = 0

//플레이어턴 체크
var Turn = 0
var Player_num = 0

//이벤트리스너 설정
const startbtn = document.querySelector("#start");
const roll = document.querySelector("#roll");

//Help 버튼 클릭
var Helpbtn = document.getElementById('help');
Helpbtn.addEventListener("click", function(){
    window.open("Image/Yacht_Help.png", "_blank", "width:933px, height:800px, location=no")
})

// ============== 게임 시작 ===============
startbtn.addEventListener("click", start_fnc)
function start_fnc(){
    if(Playing_Status == false)
    {
        playercheck()
    }
    else
    {
        alert("게임이 진행중입니다.")
    }
}
function playercheck()
{
    var a = prompt("플레이어 숫자를 입력해주세요 최소 2명 ~ 최대 4명")
    Player_num = Number(a)
    if(Player_num == 2)
    {
        Playing_Status = true
        Remain = (12 * Player_num)
        document.getElementById("Player3").innerHTML = ""
        document.getElementById("Player4").innerHTML = ""
        playstart()
    }
    else if(Player_num == 3)
    {
        Playing_Status = true
        Remain = (12 * Player_num)
        document.getElementById("Player4").innerHTML = ""
        playstart()
    }
    else if(Player_num == 4)
    {
        Playing_Status = true
        Remain = (12 * Player_num)
        playstart()
    }
    else{
        alert("올바른 값이 아닙니다. 다시 입력해주세요.")
    }
}

// ============== 게임 진행 루틴 ===============
function playstart()
{
    
    playerturn()
    rolldice()
}
    
function playerturn()
{
    Turn = (Turn % Player_num) + 1
    document.getElementById("Player_Text").innerHTML = "Player"+ Turn + " 's Turn!"
}

// ============== 주사위 굴리기 ===============
roll.addEventListener("click", rolldice)
function rolldice(){
    if(Playing_Status == true && RemainDice > 0)
    {
        for (var i = 0; i < 5; i++)
        {
            if(chk[i] == 0) // HOLD == 1
            {
                DiceValue[i] = Math.floor(Math.random() * 6) + 1
            }
            DiceSValue[i] = DiceValue[i]
        }
        DiceSValue.sort()
        displaydice()
        chk_special()
        console.log("FourofKind : ",FourofKind)
        console.log("FullHouse : ",FullHouse)
        console.log("SStraight : ",SStraight)
        console.log("LStraight : ",LStraight)
        console.log("Yacht : ",Yacht)
        RemainDice = RemainDice - 1
        document.getElementById("Remain_Text").innerHTML = ("Remain Roll : "+RemainDice)
    }
    else if(Playing_Status == true && RemainDice == 0)
    {
        alert("남은 기회가 없습니다.")
    }
    else
    {
        alert("게임 중이 아닙니다.")
    }
}

// ============== 특수족보 체크함수 ===============
function chk_special()
{
    special_reset()

    count = 0
    scount = 0
    for(var i = 0; i < 4; i++)
    {
        
        if(DiceSValue[i] == DiceSValue[i + 1])
        {
            count = count + 1 
        }

        if((DiceSValue[i + 1] - DiceSValue[i]) == 1)
        {
            scount = scount + 1 
        }
    }
    //Four of Kind, Full House, Yacht
    if(count >= 3 && ((DiceSValue[3] != DiceSValue[4]) || (DiceSValue[0] != DiceSValue[1])))
    {
        document.getElementById('Status_Text').innerHTML = ("☆★Four of Kind!!☆★")
        FourofKind = true
    }
    if(count >= 3 && ((DiceSValue[1] != DiceSValue[2]) || (DiceSValue[2] != DiceSValue[3])))
    {
        document.getElementById('Status_Text').innerHTML = ("☆★Full House!!☆★")
        FullHouse = true
    }
    if(count == 4)
    {
        document.getElementById('Status_Text').innerHTML = ("☆★☆★Yacht!!!!☆★☆★")
        FourofKind = true
        FullHouse = true
        Yacht = true
    }
    
    // Straight
    if(scount == 3 && (((DiceSValue[2] - DiceSValue[1]) != 2) && ((DiceSValue[3] - DiceSValue[2]) != 2)))
    {
        document.getElementById('Status_Text').innerHTML = ("☆★Small Straight!!☆★")
        SStraight = true
    }
    if(scount == 4)
    {
        document.getElementById('Status_Text').innerHTML = ("☆★Large Straight!!☆★")
        SStraight = true
        LStraight = true
        
    }
}


function special_reset()
{
    document.getElementById('Status_Text').innerHTML = (" ")
    FourofKind = false
    FullHouse = false
    SStraight = false
    LStraight = false
    Yacht = false
}

function afterrecord() //점수 결정 후 초기화함수
{
    //총점 기록
    chk_subtotal()
    document.getElementById("TotalP1").innerHTML = Player1
    document.getElementById("TotalP2").innerHTML = Player2
    document.getElementById("TotalP3").innerHTML = Player3
    document.getElementById("TotalP4").innerHTML = Player4

    //남은 롤횟수 초기화
    RemainDice = 3

    //체크상태 및 홀드상태 초기화
    document.getElementById("Checked1").checked = false
    document.getElementById("Checked2").checked = false
    document.getElementById("Checked3").checked = false
    document.getElementById("Checked4").checked = false
    document.getElementById("Checked5").checked = false

    for(var i = 0; i < 5; i++)
    {
        chk[i] = 0
    }
    document.getElementById('Dicet1').style.border="2px solid black";
    document.getElementById('Dicet2').style.border="2px solid black";
    document.getElementById('Dicet3').style.border="2px solid black";
    document.getElementById('Dicet4').style.border="2px solid black";
    document.getElementById('Dicet5').style.border="2px solid black";
    
    

    Remain = Remain - 1
    
    if(Remain == 0)
    {        
        var maxarr = []
        maxarr[0] = Player1
        maxarr[1] = Player2
        maxarr[2] = Player3
        maxarr[3] = Player4
        var max = 0
        max = (Player1 > Player2)? Player1 : Player2;
        max = (max > Player3)? max : Player3;
        max = (max > Player4)? max : Player4;
        for (var j = 0; j < 4; j++)
        {
            if(max == maxarr[j])
            {
                alert("Winner : Player" + (j + 1) + " !!!")
                Playing_Status = false
                break
            }
        }
    }
    else{
        alert("Turn Change")
        Sub = 0
        count = 0
        special_reset()
        playerturn()
        rolldice()
    }
    
}

// ============== 보너스 점수 계산 ===============
function chk_subtotal()
{
    if(Turn == 1 && Chksub1 == true)
    {
        Player1_Sub = Player1_Sub + Sub
        if(Player1_Sub > 62)
        {
            document.getElementById('SubtotalP1').style.backgroundColor = "#0cf163"
            document.getElementById('SubtotalP1').innerHTML = "35"
            Player1 = Player1 + 35
            Chksub1 = false
        }
        else if(P1Sub_count == 6 && Player1_Sub < 63)
        {
            document.getElementById('SubtotalP1').style.backgroundColor = "rgb(209, 23, 23)"
            document.getElementById('SubtotalP1').style.color = "white"
            document.getElementById('SubtotalP1').innerHTML = "0"
            Chksub1 = false
        }
    }
    if(Turn == 2 && Chksub2 == true)
    {
        Player2_Sub = Player2_Sub + Sub
        if(Player2_Sub > 62)
        {
            document.getElementById('SubtotalP2').style.backgroundColor = "#0cf163"
            document.getElementById('SubtotalP2').innerHTML = "35"
            Player2 = Player2 + 35
            Chksub2 = false
        }
        else if(P2Sub_count == 6 && Player2_Sub < 63)
        {
            document.getElementById('SubtotalP2').style.backgroundColor = "rgb(209, 23, 23)"
            document.getElementById('SubtotalP2').style.color = "white"
            document.getElementById('SubtotalP2').innerHTML = "0"
            Chksub2 = false
        }
    }
    if(Turn == 3 && Chksub3 == true)
    {
        Player3_Sub = Player3_Sub + Sub
        if(Player3_Sub > 62)
        {
            document.getElementById('SubtotalP3').style.backgroundColor = "#0cf163"
            document.getElementById('SubtotalP3').innerHTML = "35"
            Player3 = Player3 + 35
            Chksub3 = false
        }
        else if(P3Sub_count == 6 && Player3_Sub < 63)
        {
            document.getElementById('SubtotalP3').style.backgroundColor = "rgb(209, 23, 23)"
            document.getElementById('SubtotalP3').style.color = "white"
            document.getElementById('SubtotalP3').innerHTML = "0"
            Chksub3 = false
        }
    }
    if(Turn == 4 && Chksub4 == true)
    {
        Player4_Sub = Player4_Sub + Sub
        if(Player4_Sub > 62)
        {
            document.getElementById('SubtotalP4').style.backgroundColor = "#0cf163"
            document.getElementById('SubtotalP4').innerHTML = "35"
            Player4 = Player4 + 35
            Chksub4 = false
        }
        else if(P4Sub_count == 6 && Player4_Sub < 63)
        {
            document.getElementById('SubtotalP4').style.backgroundColor = "rgb(209, 23, 23)"
            document.getElementById('SubtotalP4').style.color = "white"
            document.getElementById('SubtotalP4').innerHTML = "0"
            Chksub4 = false
        }
    }
}





// ============== Player 1 점수 계산 ===============
var P1Ace = document.getElementById('AceP1');
P1Ace.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 1){
                    num = num + 1
                    }
                }
                document.getElementById("AceP1").innerHTML = num
                document.getElementById("AceP1").setAttribute("id", "blocked");
                Player1 = Player1 + num
                P1Sub_count = P1Sub_count + 1
                Sub = num
                afterrecord()
        }
        
});
var P1Deuces = document.getElementById('DeucesP1');
P1Deuces.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 2){
                    num = num + 2
                    }
                }
            document.getElementById("DeucesP1").innerHTML = num
            document.getElementById("DeucesP1").setAttribute("id", "blocked");
            Player1 = Player1 + num
            P1Sub_count = P1Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P1Threes = document.getElementById('ThreesP1');
P1Threes.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 3){
                    num = num + 3
                    }
                }
            document.getElementById("ThreesP1").innerHTML = num
            document.getElementById("ThreesP1").setAttribute("id", "blocked");
            Player1 = Player1 + num
            P1Sub_count = P1Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P1Fours = document.getElementById('FoursP1');
P1Fours.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 4){
                    num = num + 4
                    }
                }
            document.getElementById("FoursP1").innerHTML = num
            document.getElementById("FoursP1").setAttribute("id", "blocked");
            Player1 = Player1 + num
            P1Sub_count = P1Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P1Fives = document.getElementById('FivesP1');
P1Fives.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 5){
                    num = num + 5
                    }
                }
            document.getElementById("FivesP1").innerHTML = num
            document.getElementById("FivesP1").setAttribute("id", "blocked");
            Player1 = Player1 + num
            P1Sub_count = P1Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P1Sixes = document.getElementById('SixesP1');
P1Sixes.addEventListener("click", function()
    {
        if(Turn == 1)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 6){
                    num = num + 6
                    }
                }
            document.getElementById("SixesP1").innerHTML = num
            document.getElementById("SixesP1").setAttribute("id", "blocked");
            Player1 = Player1 + num
            P1Sub_count = P1Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
// ===================================================
var P1Choice = document.getElementById('ChoiceP1');
P1Choice.addEventListener("click", function(){
    if(Turn == 1)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("ChoiceP1").innerHTML = num
        document.getElementById("ChoiceP1").setAttribute("id", "blocked");
        Player1 = Player1 + num
        afterrecord()
    }
    
});
var P1FourofKind = document.getElementById('FourofKindP1');
P1FourofKind.addEventListener("click", function(){
    if(Turn == 1 && FourofKind == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FourofKindP1").innerHTML = num
        document.getElementById("FourofKindP1").setAttribute("id", "blocked");
        Player1 = Player1 + num
        afterrecord()
    }
    else if(Turn == 1 && FourofKind == false)
    {
        document.getElementById("FourofKindP1").innerHTML = 0
        document.getElementById("FourofKindP1").setAttribute("id", "blocked")
        afterrecord()
    }
    
});
var P1FullHouse = document.getElementById('FullHouseP1');
P1FullHouse.addEventListener("click", function(){
    if(Turn == 1 && FullHouse == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FullHouseP1").innerHTML = num
        document.getElementById("FullHouseP1").setAttribute("id", "blocked");
        Player1 = Player1 + num
        afterrecord()
    }
    else if(Turn == 1 && FullHouse == false)
    {
        document.getElementById("FullHouseP1").innerHTML = 0
        document.getElementById("FullHouseP1").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P1SStraight = document.getElementById('SStraightP1');
P1SStraight.addEventListener("click", function(){
    if(Turn == 1 && SStraight == true)
    {
        document.getElementById("SStraightP1").innerHTML = 15
        document.getElementById("SStraightP1").setAttribute("id", "blocked");
        Player1 = Player1 + 15
        afterrecord()
    }
    else if(Turn == 1 && SStraight == false)
    {
        document.getElementById("SStraightP1").innerHTML = 0
        document.getElementById("SStraightP1").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P1LStraight = document.getElementById('LStraightP1');
P1LStraight.addEventListener("click", function(){
    if(Turn == 1 && LStraight == true)
    {
        document.getElementById("LStraightP1").innerHTML = 30
        document.getElementById("LStraightP1").setAttribute("id", "blocked");
        Player1 = Player1 + 30
        afterrecord()
    }
    else if(Turn == 1 && LStraight == false)
    {
        document.getElementById("LStraightP1").innerHTML = 0
        document.getElementById("LStraightP1").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P1Yacht = document.getElementById('YachtP1');
P1Yacht.addEventListener("click", function(){
    if(Turn == 1 && Yacht == true)
    {
        document.getElementById("YachtP1").innerHTML = 50
        document.getElementById("YachtP1").setAttribute("id", "blocked");
        Player1 = Player1 + 50
        afterrecord()
    }
    else if(Turn == 1 && Yacht == false)
    {
        document.getElementById("YachtP1").innerHTML = 0
        document.getElementById("YachtP1").setAttribute("id", "blocked")
        afterrecord()
    } 
});

    
// ============== Player 2 점수 계산 ===============
var P2Ace = document.getElementById('AceP2');
P2Ace.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 1){
                    num = num + 1   
                    }
                }
                document.getElementById("AceP2").innerHTML = num
                document.getElementById("AceP2").setAttribute("id", "blocked");
                Player2 = Player2 + num
                P2Sub_count = P2Sub_count + 1
                Sub = num
                afterrecord()
        }
        
});
var P2Deuces = document.getElementById('DeucesP2');
P2Deuces.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 2){
                    num = num + 2
                    }
                }
            document.getElementById("DeucesP2").innerHTML = num
            document.getElementById("DeucesP2").setAttribute("id", "blocked");
            Player2 = Player2 + num
            P2Sub_count = P2Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P2Threes = document.getElementById('ThreesP2');
P2Threes.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 3){
                    num = num + 3
                    }
                }
            document.getElementById("ThreesP2").innerHTML = num
            document.getElementById("ThreesP2").setAttribute("id", "blocked");
            Player2 = Player2 + num
            P2Sub_count = P2Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P2Fours = document.getElementById('FoursP2');
P2Fours.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 4){
                    num = num + 4
                    }
                }
            document.getElementById("FoursP2").innerHTML = num
            document.getElementById("FoursP2").setAttribute("id", "blocked");
            Player2 = Player2 + num
            P2Sub_count = P2Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P2Fives = document.getElementById('FivesP2');
P2Fives.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 5){
                    num = num + 5
                    }
                }
            document.getElementById("FivesP2").innerHTML = num
            document.getElementById("FivesP2").setAttribute("id", "blocked");
            Player2 = Player2 + num
            P2Sub_count = P2Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P2Sixes = document.getElementById('SixesP2');
P2Sixes.addEventListener("click", function()
    {
        if(Turn == 2)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 6){
                    num = num + 6
                    }
                }
            document.getElementById("SixesP2").innerHTML = num
            document.getElementById("SixesP2").setAttribute("id", "blocked");
            Player2 = Player2 + num
            P2Sub_count = P2Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
// ===================================================
var P2Choice = document.getElementById('ChoiceP2');
P2Choice.addEventListener("click", function(){
    if(Turn == 2)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("ChoiceP2").innerHTML = num
        document.getElementById("ChoiceP2").setAttribute("id", "blocked");
        Player2 = Player2 + num
        afterrecord()
    }
    
});
var P2FourofKind = document.getElementById('FourofKindP2');
P2FourofKind.addEventListener("click", function(){
    if(Turn == 2 && FourofKind == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FourofKindP2").innerHTML = num
        document.getElementById("FourofKindP2").setAttribute("id", "blocked");
        Player2 = Player2 + num
        afterrecord()
    }
    else if(Turn == 2 && FourofKind == false)
    {
        document.getElementById("FourofKindP2").innerHTML = 0
        document.getElementById("FourofKindP2").setAttribute("id", "blocked")
        afterrecord()
    }
    
});
var P2FullHouse = document.getElementById('FullHouseP2');
P2FullHouse.addEventListener("click", function(){
    if(Turn == 2 && FullHouse == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FullHouseP2").innerHTML = num
        document.getElementById("FullHouseP2").setAttribute("id", "blocked");
        Player2 = Player2 + num
        afterrecord()
    }
    else if(Turn == 2 && FullHouse == false)
    {
        document.getElementById("FullHouseP2").innerHTML = 0
        document.getElementById("FullHouseP2").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P2SStraight = document.getElementById('SStraightP2');
P2SStraight.addEventListener("click", function(){
    if(Turn == 2 && SStraight == true)
    {
        document.getElementById("SStraightP2").innerHTML = 15
        document.getElementById("SStraightP2").setAttribute("id", "blocked");
        Player2 = Player2 + 15
        afterrecord()
    }
    else if(Turn == 2 && SStraight == false)
    {
        document.getElementById("SStraightP2").innerHTML = 0
        document.getElementById("SStraightP2").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P2LStraight = document.getElementById('LStraightP2');
P2LStraight.addEventListener("click", function(){
    if(Turn == 2 && LStraight == true)
    {
        document.getElementById("LStraightP2").innerHTML = 30
        document.getElementById("LStraightP2").setAttribute("id", "blocked");
        Player2 = Player2 + 30
        afterrecord()
    }
    else if(Turn == 2 && LStraight == false)
    {
        document.getElementById("LStraightP2").innerHTML = 0
        document.getElementById("LStraightP2").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P2Yacht = document.getElementById('YachtP2');
P2Yacht.addEventListener("click", function(){
    if(Turn == 2 && Yacht == true)
    {
        document.getElementById("YachtP2").innerHTML = 50
        document.getElementById("YachtP2").setAttribute("id", "blocked");
        Player2 = Player2 + 50
        afterrecord()
    }
    else if(Turn == 2 && Yacht == false)
    {
        document.getElementById("YachtP2").innerHTML = 0
        document.getElementById("YachtP2").setAttribute("id", "blocked")
        afterrecord()
    } 
});
// ============== Player 3 점수 계산 ===============
var P3Ace = document.getElementById('AceP3');
P3Ace.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 1){
                    num = num + 1
                    }
                }
                document.getElementById("AceP3").innerHTML = num
                document.getElementById("AceP3").setAttribute("id", "blocked");
                Player3 = Player3 + num
                P3Sub_count = P3Sub_count + 1
                Sub = num
                afterrecord()
        }
        
});
var P3Deuces = document.getElementById('DeucesP3');
P3Deuces.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 2){
                    num = num + 2
                    }
                }
            document.getElementById("DeucesP3").innerHTML = num
            document.getElementById("DeucesP3").setAttribute("id", "blocked");
            Player3 = Player3 + num
            P3Sub_count = P3Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P3Threes = document.getElementById('ThreesP3');
P3Threes.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 3){
                    num = num + 3
                    }
                }
            document.getElementById("ThreesP3").innerHTML = num
            document.getElementById("ThreesP3").setAttribute("id", "blocked");
            Player3 = Player3 + num
            P3Sub_count = P3Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P3Fours = document.getElementById('FoursP3');
P3Fours.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 4){
                    num = num + 4
                    }
                }
            document.getElementById("FoursP3").innerHTML = num
            document.getElementById("FoursP3").setAttribute("id", "blocked");
            Player3 = Player3 + num
            P3Sub_count = P3Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P3Fives = document.getElementById('FivesP3');
P3Fives.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 5){
                    num = num + 5
                    }
                }
            document.getElementById("FivesP3").innerHTML = num
            document.getElementById("FivesP3").setAttribute("id", "blocked");
            Player3 = Player3 + num
            P3Sub_count = P3Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P3Sixes = document.getElementById('SixesP3');
P3Sixes.addEventListener("click", function()
    {
        if(Turn == 3)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 6){
                    num = num + 6
                    }
                }
            document.getElementById("SixesP3").innerHTML = num
            document.getElementById("SixesP3").setAttribute("id", "blocked");
            Player3 = Player3 + num
            P3Sub_count = P3Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
// ===================================================
var P3Choice = document.getElementById('ChoiceP3');
P3Choice.addEventListener("click", function(){
    if(Turn == 3)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("ChoiceP3").innerHTML = num
        document.getElementById("ChoiceP3").setAttribute("id", "blocked");
        Player3 = Player3 + num
        afterrecord()
    }
    
});
var P3FourofKind = document.getElementById('FourofKindP3');
P3FourofKind.addEventListener("click", function(){
    if(Turn == 3 && FourofKind == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FourofKindP3").innerHTML = num
        document.getElementById("FourofKindP3").setAttribute("id", "blocked");
        Player3 = Player3 + num
        afterrecord()
    }
    else if(Turn == 3 && FourofKind == false)
    {
        document.getElementById("FourofKindP3").innerHTML = 0
        document.getElementById("FourofKindP3").setAttribute("id", "blocked")
        afterrecord()
    }
    
});
var P3FullHouse = document.getElementById('FullHouseP3');
P3FullHouse.addEventListener("click", function(){
    if(Turn == 3 && FullHouse == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FullHouseP3").innerHTML = num
        document.getElementById("FullHouseP3").setAttribute("id", "blocked");
        Player3 = Player3 + num
        afterrecord()
    }
    else if(Turn == 3 && FullHouse == false)
    {
        document.getElementById("FullHouseP3").innerHTML = 0
        document.getElementById("FullHouseP3").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P3SStraight = document.getElementById('SStraightP3');
P3SStraight.addEventListener("click", function(){
    if(Turn == 3 && SStraight == true)
    {
        document.getElementById("SStraightP3").innerHTML = 15
        document.getElementById("SStraightP3").setAttribute("id", "blocked");
        Player3 = Player3 + 15
        afterrecord()
    }
    else if(Turn == 3 && SStraight == false)
    {
        document.getElementById("SStraightP3").innerHTML = 0
        document.getElementById("SStraightP3").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P3LStraight = document.getElementById('LStraightP3');
P3LStraight.addEventListener("click", function(){
    if(Turn == 3 && LStraight == true)
    {
        document.getElementById("LStraightP3").innerHTML = 30
        document.getElementById("LStraightP3").setAttribute("id", "blocked");
        Player3 = Player3 + 30
        afterrecord()
    }
    else if(Turn == 3 && LStraight == false)
    {
        document.getElementById("LStraightP3").innerHTML = 0
        document.getElementById("LStraightP3").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P3Yacht = document.getElementById('YachtP3');
P3Yacht.addEventListener("click", function(){
    if(Turn == 3 && Yacht == true)
    {
        document.getElementById("YachtP3").innerHTML = 50
        document.getElementById("YachtP3").setAttribute("id", "blocked");
        Player3 = Player3 + 50
        afterrecord()
    }
    else if(Turn == 3 && Yacht == false)
    {
        document.getElementById("YachtP3").innerHTML = 0
        document.getElementById("YachtP3").setAttribute("id", "blocked")
        afterrecord()
    } 
});
// ============== Player 4 점수 계산 ===============
var P4Ace = document.getElementById('AceP4');
P4Ace.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 1){
                    num = num + 1
                    }
                }
                document.getElementById("AceP4").innerHTML = num
                document.getElementById("AceP4").setAttribute("id", "blocked");
                Player4 = Player4 + num
                P4Sub_count = P4Sub_count + 1
                Sub = num
                afterrecord()
        }
        
});
var P4Deuces = document.getElementById('DeucesP4');
P4Deuces.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 2){
                    num = num + 2
                    }
                }
            document.getElementById("DeucesP4").innerHTML = num
            document.getElementById("DeucesP4").setAttribute("id", "blocked");
            Player4 = Player4 + num
            P4Sub_count = P4Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P4Threes = document.getElementById('ThreesP4');
P4Threes.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 3){
                    num = num + 3
                    }
                }
            document.getElementById("ThreesP4").innerHTML = num
            document.getElementById("ThreesP4").setAttribute("id", "blocked");
            Player4 = Player4 + num
            P4Sub_count = P4Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P4Fours = document.getElementById('FoursP4');
P4Fours.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 4){
                    num = num + 4
                    }
                }
            document.getElementById("FoursP4").innerHTML = num
            document.getElementById("FoursP4").setAttribute("id", "blocked");
            Player4 = Player4 + num
            P4Sub_count = P4Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P4Fives = document.getElementById('FivesP4');
P4Fives.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 5){
                    num = num + 5
                    }
                }
            document.getElementById("FivesP4").innerHTML = num
            document.getElementById("FivesP4").setAttribute("id", "blocked");
            Player4 = Player4 + num
            P4Sub_count = P4Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
var P4Sixes = document.getElementById('SixesP4');
P4Sixes.addEventListener("click", function()
    {
        if(Turn == 4)
        {
            var num = 0
            for (var i = 0; i < 5; i++)
                {
                    if(DiceValue[i] == 6){
                    num = num + 6
                    }
                }
            document.getElementById("SixesP4").innerHTML = num
            document.getElementById("SixesP4").setAttribute("id", "blocked");
            Player4 = Player4 + num
            P4Sub_count = P4Sub_count + 1
            Sub = num
            afterrecord()
        }
        
});
// ===================================================
var P4Choice = document.getElementById('ChoiceP4');
P4Choice.addEventListener("click", function(){
    if(Turn == 4)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("ChoiceP4").innerHTML = num
        document.getElementById("ChoiceP4").setAttribute("id", "blocked");
        Player4 = Player4 + num
        afterrecord()
    }
    
});
var P4FourofKind = document.getElementById('FourofKindP4');
P4FourofKind.addEventListener("click", function(){
    if(Turn == 4 && FourofKind == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FourofKindP4").innerHTML = num
        document.getElementById("FourofKindP4").setAttribute("id", "blocked");
        Player4 = Player4 + num
        afterrecord()
    }
    else if(Turn == 4 && FourofKind == false)
    {
        document.getElementById("FourofKindP4").innerHTML = 0
        document.getElementById("FourofKindP4").setAttribute("id", "blocked")
        afterrecord()
    }
    
});
var P4FullHouse = document.getElementById('FullHouseP4');
P4FullHouse.addEventListener("click", function(){
    if(Turn == 4 && FullHouse == true)
    {
        var num = 0
        for (var i = 0; i < 5; i++)
            {
                num = num + DiceValue[i]
            }
        document.getElementById("FullHouseP4").innerHTML = num
        document.getElementById("FullHouseP4").setAttribute("id", "blocked");
        Player4 = Player4 + num
        afterrecord()
    }
    else if(Turn == 4 && FullHouse == false)
    {
        document.getElementById("FullHouseP4").innerHTML = 0
        document.getElementById("FullHouseP4").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P4SStraight = document.getElementById('SStraightP4');
P4SStraight.addEventListener("click", function(){
    if(Turn == 4 && SStraight == true)
    {
        document.getElementById("SStraightP4").innerHTML = 15
        document.getElementById("SStraightP4").setAttribute("id", "blocked");
        Player4 = Player4 + 15
        afterrecord()
    }
    else if(Turn == 4 && SStraight == false)
    {
        document.getElementById("SStraightP4").innerHTML = 0
        document.getElementById("SStraightP4").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P4LStraight = document.getElementById('LStraightP4');
P4LStraight.addEventListener("click", function(){
    if(Turn == 4 && LStraight == true)
    {
        document.getElementById("LStraightP4").innerHTML = 30
        document.getElementById("LStraightP4").setAttribute("id", "blocked");
        Player4 = Player4 + 30
        afterrecord()
    }
    else if(Turn == 4 && LStraight == false)
    {
        document.getElementById("LStraightP4").innerHTML = 0
        document.getElementById("LStraightP4").setAttribute("id", "blocked")
        afterrecord()
    } 
});
var P4Yacht = document.getElementById('YachtP4');
P4Yacht.addEventListener("click", function(){
    if(Turn == 4 && Yacht == true)
    {
        document.getElementById("YachtP4").innerHTML = 50
        document.getElementById("YachtP4").setAttribute("id", "blocked");
        Player4 = Player4 + 50
        afterrecord()
    }
    else if(Turn == 4 && Yacht == false)
    {
        document.getElementById("YachtP4").innerHTML = 0
        document.getElementById("YachtP4").setAttribute("id", "blocked")
        afterrecord()
    } 
});


// ============== 체크박스처리 ===============
var dc1 = document.getElementById('Checked1')
var dc2 = document.getElementById('Checked2')
var dc3 = document.getElementById('Checked3')
var dc4 = document.getElementById('Checked4')
var dc5 = document.getElementById('Checked5')
dc1.addEventListener('click', (e) => 
{
    if (dc1.checked) {
        chk[0] = 1
        document.getElementById('Dicet1').style.border="2px solid red";
    } 
    else {
        chk[0] = 0
        document.getElementById('Dicet1').style.border="2px solid black";
    }
});
dc2.addEventListener('click', (e) => 
{
    if (dc2.checked) {
        chk[1] = 1
        document.getElementById('Dicet2').style.border="2px solid red";
    } 
    else {
        chk[1] = 0
        document.getElementById('Dicet2').style.border="2px solid black";
    }
});
dc3.addEventListener('click', (e) => 
{
    if (dc3.checked) {
        chk[2] = 1
        document.getElementById('Dicet3').style.border="2px solid red";
    } 
    else {
        chk[2] = 0
        document.getElementById('Dicet3').style.border="2px solid black";
    }
});
dc4.addEventListener('click', (e) => 
{
    if (dc4.checked) {
        chk[3] = 1
        document.getElementById('Dicet4').style.border="2px solid red";
    } 
    else {
        chk[3] = 0
        document.getElementById('Dicet4').style.border="2px solid black";
    }
});
dc5.addEventListener('click', (e) => 
{
    if (dc5.checked) {
        chk[4] = 1
        document.getElementById('Dicet5').style.border="2px solid red";
    } 
    else {
        chk[4] = 0
        document.getElementById('Dicet5').style.border="2px solid black";
    }
});





// =================  주사위출력 =========================
function displaydice()
{
    if(DiceValue[0] == 1){
        document.getElementById("Dice1").src = "Image/one.png"
    }
     if(DiceValue[0] == 2){
        document.getElementById("Dice1").src = "Image/two.png"
    }
     if(DiceValue[0] == 3){
        document.getElementById("Dice1").src = "Image/three.png"
    }
     if(DiceValue[0] == 4){
        document.getElementById("Dice1").src = "Image/four.png"
    }
     if(DiceValue[0] == 5){
        document.getElementById("Dice1").src = "Image/five.png"
    }
     if(DiceValue[0] == 6){
        document.getElementById("Dice1").src = "Image/six.png"
    }
     if(DiceValue[1] == 1){
        document.getElementById("Dice2").src = "Image/one.png"
    }
     if(DiceValue[1] == 2){
        document.getElementById("Dice2").src = "Image/two.png"
    }
     if(DiceValue[1] == 3){
        document.getElementById("Dice2").src = "Image/three.png"
    }
     if(DiceValue[1] == 4){
        document.getElementById("Dice2").src = "Image/four.png"
    }
     if(DiceValue[1] == 5){
        document.getElementById("Dice2").src = "Image/five.png"
    }
     if(DiceValue[1] == 6){
        document.getElementById("Dice2").src = "Image/six.png"
    }
     if(DiceValue[2] == 1){
        document.getElementById("Dice3").src = "Image/one.png"
    }
     if(DiceValue[2] == 2){
        document.getElementById("Dice3").src = "Image/two.png"
    }
     if(DiceValue[2] == 3){
        document.getElementById("Dice3").src = "Image/three.png"
    }
     if(DiceValue[2] == 4){
        document.getElementById("Dice3").src = "Image/four.png"
    }
     if(DiceValue[2] == 5){
        document.getElementById("Dice3").src = "Image/five.png"
    }
     if(DiceValue[2] == 6){
        document.getElementById("Dice3").src = "Image/six.png"
    }
     if(DiceValue[3] == 1){
        document.getElementById("Dice4").src = "Image/one.png"
    }
     if(DiceValue[3] == 2){
        document.getElementById("Dice4").src = "Image/two.png"
    }
     if(DiceValue[3] == 3){
        document.getElementById("Dice4").src = "Image/three.png"
    }
     if(DiceValue[3] == 4){
        document.getElementById("Dice4").src = "Image/four.png"
    }
     if(DiceValue[3] == 5){
        document.getElementById("Dice4").src = "Image/five.png"
    }
     if(DiceValue[3] == 6){
        document.getElementById("Dice4").src = "Image/six.png"
    }
     if(DiceValue[4] == 1){
        document.getElementById("Dice5").src = "Image/one.png"
    }
     if(DiceValue[4] == 2){
        document.getElementById("Dice5").src = "Image/two.png"
    }
     if(DiceValue[4] == 3){
        document.getElementById("Dice5").src = "Image/three.png"
    }
     if(DiceValue[4] == 4){
        document.getElementById("Dice5").src = "Image/four.png"
    }
     if(DiceValue[4] == 5){
        document.getElementById("Dice5").src = "Image/five.png"
    }
     if(DiceValue[4] == 6){
        document.getElementById("Dice5").src = "Image/six.png"
    }
}
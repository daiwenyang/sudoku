//  const model={
//     value:number,
//     origin:true | false
//  }

// 生成1到9的随机数；
function getRandomNum(max){
   return Math.floor(Math.random() * max) + 1;
}

export function ForEach(array,action){
   array.forEach(item=>{
      if(Object.prototype.toString.call(item) === "[object Array]"){
         ForEach(item,action)
      }else{
         action(item)
      }
   })
}

// 多维数组map
export function ArrayMap(array,action){
   return array.map(item=>{
      if(Object.prototype.toString.call(item) === "[object Array]"){
         return ArrayMap(item,action)
      }else{
         return action(item)
      }
   })
}

export function getSudoList(){
   // 随机生成满足数独规则的矩阵四个角的数字
   var tem = [];
   while(tem.length < 4){
      let num = getRandomNum(9);
      if(!tem.includes(num)){
         tem.push(num);
      }
   }
   const list = [];
   for(let row = 0 ;row < 9;row++){
      let tem = [];
      list.push(tem);
      for(let col = 0 ;col < 9;col++){
         list[row][col] = 0;
      }
   }
   list[0][0] = tem[0];
   list[0][8] = tem[1];
   list[8][0] = tem[2];
   list[8][8] = tem[3];
   // 生成完整的数独表
   sudoSolver(list);
   // 随机去掉其中的部分元素
   for(let i=0 ;i<40;i++){
      list[getRandomNum(9) -1][getRandomNum(9) -1] = 0;
   }
   return list
}

//  数独解题器
export function sudoSolver(matrix){
   if(solveFun(matrix)){
      return matrix
   }
   return "此题无解！"
}

export function checkSudoList(list){
   // 检查是否有空格
   let row = 0,col =0;
   for(row =0;row < list.length ;row ++){
      for(col =0;col < list[row].length ;col ++){
         if(list[row][col] === 0){
           return false
         }
      }
   }
   // 数字校验不通过
   for(row =0;row < list.length ;row ++){
      for(col =0;col < list[row].length ;col ++){
         // 缓存值
         let num = list[row][col];
         list[row][col] = 0;
         if(!isSafe(list,row,col,num)){
           return false
         }
         // 恢复原值
         list[row][col] = num;
      }
   }
   return true
}

export function solveFun(matrix){
   //  第一步，先查找是否有空白项，并且定位坐标；
   let row = 0,col =0,hasBlank =false;
   for(row =0;row < matrix.length ;row ++){
      for(col =0;col < matrix[row].length ;col ++){
         if(matrix[row][col] === 0){
            hasBlank = true;
            break;
         }
      }
      if(hasBlank){
         break;
      }
   }
   // 如果没有空白项，就返回true，表示检验通过
   if(!hasBlank){
      return true;
   }
   // 如果还有空格则尝试填充数字，求解；
   for(let num =1 ;num <= 9;num++){
      if(isSafe(matrix,row,col,num)){
         // 如果满足条件，仅仅是其中的一种情况，继续递归填充
         matrix[row][col] = num;
         // 如果递归依然检验通过，就返回true,否则，重置为空白，继续循环遍历下个数字，看是否通过
         if(solveFun(matrix)){
            return true
         }
         matrix[row][col] = 0;
      }
   }
   // 如果走到这一步就说明前面没有检验通过，无解，如果一直递归到顶层依然无解，就说明此题无解
   return false

}

/**
 * 三个判断条件：
 *    1、横向
 *    2、纵向
 *    3、九宫格
 */

function isSafe(matrix,row,col,num){
   const checkRow=function(matrix,row,num){
      for(let col = 0;col < matrix[row].length ;col++){
         if(matrix[row][col] === num){
            return true
         }
      }
      return false;
   }
   const checkCol=function(matrix,col,num){
      for(let row = 0;row < matrix.length ;row++){
         if(matrix[row][col] === num){
            return true
         }
      }
      return false;
   }
   const checkBox=function(matrix,startRow,startCol,num){
      for(let row=0; row < 3;row++){
         for(let col=0; col < 3;col++){
            if(matrix[row + startRow][col + startCol] === num){
               return true
            }
         }
      }
      return false;
   }
   return (
      !checkRow(matrix,row,num) && 
      !checkCol(matrix,col,num) && 
      !checkBox(matrix,row - (row % 3),col - (col % 3),num)
   )
}
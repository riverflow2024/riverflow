// const button = document.querySelector("button")
// button.addEventListener("click", () => {
//   fetch("http://localhost:3000/create-checkout-session", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       items: [
//         { id: 1, quantity: 3 },
//         { id: 2, quantity: 1 },
//       ],
//     }),
//   }).then(res => {
//     if (res.ok) return res.json()
//     return res.json().then(json => Promise.reject(json))

//   }).then(({ url }) => {
//     console.log(url)
//     window.location = url
//   }).catch(e => {
//     console.error(e.error)
//   })
// })



// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('checkoutForm');
//   const addItemButton = document.getElementById('addItem');
//   const itemInputs = document.getElementById('itemInputs');

//   addItemButton.addEventListener('click', () => {
//       const newItemInput = document.createElement('div');
//       newItemInput.className = 'item-input';
//       newItemInput.innerHTML = `
//           <input type="text" name="name" placeholder="商品名稱" required>
//           <input type="number" name="quantity" placeholder="數量" min="1" required>
//           <input type="number" name="price" placeholder="價格 (以分為單位)" min="1" required>
//       `;
//       itemInputs.appendChild(newItemInput);
//   });

//   form.addEventListener('submit', async (e) => {
//       e.preventDefault();
      
//       const items = [];
//       const itemInputs = document.querySelectorAll('.item-input');
      
//       itemInputs.forEach((item, index) => {
//           const name = item.querySelector('input[name="name"]').value;
//           const quantity = parseInt(item.querySelector('input[name="quantity"]').value);
//           const price = parseInt(item.querySelector('input[name="price"]').value);
          
//           items.push({
//               id: index + 1,
//               name,
//               quantity,
//               price
//           });
//       });

//       try {
//           const response = await fetch("http://localhost:3000/riverflow/pay/create-checkout-session", {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ items })
//           });

//           if (response.ok) {
//               const { url } = await response.json();
//               window.location = url;
//           } else {
//               const errorData = await response.json();
//               throw new Error(errorData.error);
//           }
//       } catch (error) {
//           console.error('錯誤:', error.message);
//       }
//   });
// });




document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    const addItemButton = document.getElementById('addItem');
    const itemInputs = document.getElementById('itemInputs');
  
    addItemButton.addEventListener('click', () => {
        const newItemInput = document.createElement('div');
        newItemInput.className = 'item-input';
        newItemInput.innerHTML = `
            <input type="text" name="name" placeholder="商品名稱" required>
            <input type="number" name="quantity" placeholder="數量" min="1" required>
            <input type="number" name="price" placeholder="價格 (以分為單位)" min="1" required>
            <input type="text" name="size" placeholder="尺寸" required>
        `;
        itemInputs.appendChild(newItemInput);
    });
  
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const items = [];
        const itemInputs = document.querySelectorAll('.item-input');
        
        itemInputs.forEach((item, index) => {
            const name = item.querySelector('input[name="name"]').value;
            const quantity = parseInt(item.querySelector('input[name="quantity"]').value);
            const price = parseInt(item.querySelector('input[name="price"]').value);
            const size = item.querySelector('input[name="size"]').value;
            
            items.push({
                id: index + 1,
                name,
                quantity,
                price,
                size
            });
        });
  
        try {
            const response = await fetch("http://localhost:3000/riverflow/pay/create-checkout-session", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items })
            });
  
            if (response.ok) {
                const { url } = await response.json();
                window.location = url;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error('錯誤:', error.message);
        }
    });
  });
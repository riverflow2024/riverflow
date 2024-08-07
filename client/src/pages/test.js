
        showBtn.onclick=function(){
            var x = $('#showBtn').hasClass('bi-eye-slash-fill');
            if(x){
                $('#showBtn').removeClass('bi-eye-slash-fill').addClass('bi-eye-fill')
                $('#password').attr("type", "text").css('width','80%');
            }else{
                $('#showBtn').removeClass('bi-eye-fill').addClass('bi-eye-slash-fill')
                $('#password').attr("type", "password");
            }
        }

        // email輸入
        email.addEventListener('input', function () {
            if (email.validity.patternMismatch) {
                emailTips.innerHTML = `<i class="bi bi-asterisk"></i> 不符合email規則，請確認是否包含[@]`;
            }else {
                emailTips.innerHTML = ``
            }
        });

    
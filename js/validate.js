document.addEventListener('DOMContentLoaded', function () {


    const subscribeForm = document.querySelector('.email-news form');
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const email = emailInput.value;
        if (validateEmail(email)) {
            Swal.fire({
                title: 'Success',
                text: 'Subscribed successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            emailInput.value = '';
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Please enter a valid email address.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

});

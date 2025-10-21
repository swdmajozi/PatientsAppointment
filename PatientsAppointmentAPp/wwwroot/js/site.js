document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('appointmentForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const tokenEl = form.querySelector('input[name="__RequestVerificationToken"]');
        const token = tokenEl ? tokenEl.value : '';

        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'RequestVerificationToken': token
            },
            body: formData
        });

        // Clear old errors
        document.querySelectorAll('.field-error').forEach(el => el.textContent = '');
        const summary = document.querySelector('.validation-summary');
        if (summary) summary.textContent = '';

        if (response.ok) {
            const data = await response.json();
            alert(data.message || 'Appointment booked successfully');
            form.reset();
        } else {
            try {
                const payload = await response.json();
                if (payload.errors) {
                    // payload.errors is a dictionary of field -> [messages]
                    for (const key in payload.errors) {
                        const simpleKey = key.replace(/^[^\\.]*\\./, ''); // in case keys are like "model.PatientName"
                        const span = document.querySelector(`[data-for="${simpleKey}"]`);
                        if (span) {
                            span.textContent = payload.errors[key].join(', ');
                        } else if (summary) {
                            summary.textContent = 'Please correct the highlighted errors.';
                        }
                    }
                } else {
                    alert('An error occurred while creating the appointment.');
                }
            } catch (ex) {
                alert('An error occurred while processing the response.');
            }
        }
    });
});
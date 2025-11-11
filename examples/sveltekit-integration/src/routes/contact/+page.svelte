<script lang="ts">
  let formData = $state({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  let isSubmitting = $state(false);
  let submitMessage = $state('');
  let submitSuccess = $state(false);

  async function handleSubmit() {
    if (isSubmitting) return;
    
    isSubmitting = true;
    submitMessage = '';
    submitSuccess = false;

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        submitSuccess = true;
        submitMessage = 'Thank you! Your message has been sent successfully.';
        // Reset form
        formData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
      } else {
        submitSuccess = false;
        submitMessage = result.error || 'Failed to send message. Please try again.';
      }
    } catch (error) {
      submitSuccess = false;
      submitMessage = 'An error occurred. Please try again later.';
      console.error('Form submission error:', error);
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>Contact Us - {import.meta.env.VITE_SITE_NAME || 'Your Site'}</title>
  <meta name="description" content="Get in touch with us using this contact form." />
</svelte:head>

<div class="container">
  <div class="contact-form">
    <h1>Contact Us</h1>
    <p>Fill out the form below and we'll get back to you as soon as possible.</p>

    {#if submitMessage}
      <div class="message {submitSuccess ? 'success' : 'error'}" role="alert">
        {submitMessage}
      </div>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div class="form-group">
        <label for="name">
          Name <span class="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          disabled={isSubmitting}
          placeholder="Your full name"
        />
      </div>

      <div class="form-group">
        <label for="email">
          Email <span class="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          bind:value={formData.email}
          required
          disabled={isSubmitting}
          placeholder="your.email@example.com"
        />
      </div>

      <div class="form-group">
        <label for="subject">
          Subject <span class="required">*</span>
        </label>
        <input
          type="text"
          id="subject"
          bind:value={formData.subject}
          required
          disabled={isSubmitting}
          placeholder="What is this regarding?"
        />
      </div>

      <div class="form-group">
        <label for="message">
          Message <span class="required">*</span>
        </label>
        <textarea
          id="message"
          bind:value={formData.message}
          required
          disabled={isSubmitting}
          rows="6"
          placeholder="Tell us more about your inquiry..."
        ></textarea>
      </div>

      <button type="submit" disabled={isSubmitting} class="submit-btn">
        {#if isSubmitting}
          <span class="spinner"></span>
          Sending...
        {:else}
          Send Message
        {/if}
      </button>
    </form>
  </div>
</div>

<style>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .contact-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }

  .required {
    color: #e74c3c;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
  }

  input:disabled,
  textarea:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    background: #3498db;
    color: white;
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .submit-btn:hover:not(:disabled) {
    background: #2980b9;
  }

  .submit-btn:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid #ffffff;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .message {
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  .message.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }

  .message.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }

  @media (max-width: 768px) {
    .container {
      padding: 1rem 0.5rem;
    }

    .contact-form {
      padding: 1.5rem;
    }
  }
</style>
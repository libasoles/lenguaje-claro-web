export function createSupabaseWaitlistStore(supabase) {
  return {
    async findSubscriberByEmail(email) {
      const { data, error } = await supabase
        .from("suscriptores")
        .select("id, email, activo")
        .eq("email", email)
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    },

    async createSubscriber({ email, origin }) {
      const { data, error } = await supabase
        .from("suscriptores")
        .insert({
          email,
          origen: origin,
        })
        .select("id, email, origen, activo")
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    async createEmailLog({
      suscriptorId,
      templateKey,
      provider,
      state,
      providerMessageId = null,
      errorMessage = null,
      sentAt = null,
    }) {
      const { data, error } = await supabase
        .from("emails")
        .insert({
          suscriptor_id: suscriptorId,
          template_key: templateKey,
          provider,
          estado: state,
          provider_message_id: providerMessageId,
          error_message: errorMessage,
          sent_at: sentAt,
        })
        .select("id, estado")
        .single();

      if (error) {
        throw error;
      }

      return data;
    },

    async updateEmailLog(id, patch) {
      const payload = {};

      if ("state" in patch) payload.estado = patch.state;
      if ("providerMessageId" in patch) {
        payload.provider_message_id = patch.providerMessageId;
      }
      if ("errorMessage" in patch) payload.error_message = patch.errorMessage;
      if ("sentAt" in patch) payload.sent_at = patch.sentAt;

      const { error } = await supabase.from("emails").update(payload).eq("id", id);

      if (error) {
        throw error;
      }
    },
  };
}
